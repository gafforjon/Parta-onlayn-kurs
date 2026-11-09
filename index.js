// Cloud Functions для push-уведомлений PARTA (Realtime Database -> Firebase Cloud Messaging).
const { onValueCreated } = require('firebase-functions/v2/database');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { logger } = require('firebase-functions');
const admin = require('firebase-admin');
const { buildSystem, sanitize, hourBucket, nextUsage, LIMIT_PER_HOUR } = require('./assistant');
const { compose, groupByLang } = require('./messages');

admin.initializeApp();
const db = () => admin.database();
const INSTANCE = 'parta-onlayn-kurs-default-rtdb'; // имя вашей базы (из databaseURL)
const DEAD = ['messaging/registration-token-not-registered', 'messaging/invalid-registration-token'];

async function notify(uids, kind, a, b, url) {
  for (const uid of [...new Set(uids)].filter(Boolean)) {
    const fcm = (await db().ref('users/' + uid + '/fcm').get()).val();
    const groups = groupByLang(fcm);
    for (const lang of ['ru', 'uz']) {
      const tokens = groups[lang];
      if (!tokens.length) continue;
      const m = compose(kind, lang, a, b);
      const res = await admin.messaging().sendEachForTokens({ tokens, data: { title: m.title, body: m.body, url: url || './' } });
      const dead = [];
      res.responses.forEach((r, i) => { if (!r.success && r.error && DEAD.includes(r.error.code)) dead.push(tokens[i]); });
      await Promise.all(dead.map((t) => db().ref('users/' + uid + '/fcm/' + t).remove()));
    }
  }
}

exports.onChatMessage = onValueCreated({ ref: '/chatMsgs/{cid}/{mid}', instance: INSTANCE }, async (e) => {
  const m = e.data.val();
  const meta = (await db().ref('chats/' + e.params.cid).get()).val();
  if (!m || !meta) return;
  const to = m.from === meta.t ? meta.s : meta.t;
  if (!to || to === m.from) return;
  await notify([to], 'chat', m.from === meta.t ? meta.tName : meta.sName, m.text, '#/teachers');
});

exports.onHomework = onValueCreated({ ref: '/homework/{cid}/{hid}', instance: INSTANCE }, async (e) => {
  const h = e.data.val();
  const c = (await db().ref('classes/' + e.params.cid).get()).val();
  if (!h || !c) return;
  await notify(Object.keys(c.members || {}), 'homework', c.name, h.title, '#/classes');
});

exports.onTest = onValueCreated({ ref: '/tests/{cid}/{tid}', instance: INSTANCE }, async (e) => {
  const t = e.data.val();
  const c = (await db().ref('classes/' + e.params.cid).get()).val();
  if (!t || !c) return;
  await notify(Object.keys(c.members || {}), 'test', c.name, t.title, '#/classes');
});

exports.onSubmission = onValueCreated({ ref: '/submissions/{cid}/{hid}/{uid}', instance: INSTANCE }, async (e) => {
  const s = e.data.val();
  const owner = (await db().ref('classes/' + e.params.cid + '/owner').get()).val();
  const hw = (await db().ref('homework/' + e.params.cid + '/' + e.params.hid + '/title').get()).val();
  if (!s || !owner) return;
  await notify([owner], 'submission', s.name, hw || '', '#/classes');
});

// ---- ИИ-помощник: защищённый посредник к Anthropic API (ключ хранится как секрет, не в коде сайта) ----
const ANTHROPIC_API_KEY = defineSecret('ANTHROPIC_API_KEY');
exports.askAssistant = onCall({ secrets: [ANTHROPIC_API_KEY], region: 'us-central1', timeoutSeconds: 60, maxInstances: 10 }, async (req) => {
  const a = req.auth;
  if (!a || !a.token || !a.token.firebase || a.token.firebase.sign_in_provider === 'anonymous') throw new HttpsError('unauthenticated', 'Sign in required');
  const d = req.data || {};
  const grade = Math.min(11, Math.max(1, parseInt(d.grade, 10) || 7));
  const lang = d.lang === 'uz' ? 'uz' : 'ru';
  let messages;
  try { messages = sanitize(d.messages); } catch (e) { throw new HttpsError('invalid-argument', 'Bad messages'); }
  const bucket = hourBucket(Date.now());
  const tx = await db().ref('aiUsage/' + a.uid).transaction((v) => nextUsage(v, bucket, LIMIT_PER_HOUR));
  if (!tx.committed) throw new HttpsError('resource-exhausted', 'Hourly limit reached');
  const refund = () => db().ref('aiUsage/' + a.uid).transaction((v) => (v && v.b === bucket && v.n > 0 ? { b: v.b, n: v.n - 1 } : v));
  let resp;
  try {
    resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY.value(), 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5', max_tokens: 700, system: buildSystem(grade, lang), messages }),
    });
  } catch (e) { logger.error('AI request failed', e.message); await refund(); throw new HttpsError('unavailable', 'AI unavailable'); }
  if (!resp.ok) { logger.error('AI error status', resp.status); await refund(); throw new HttpsError('unavailable', 'AI unavailable'); }
  const j = await resp.json();
  const text = (j.content || []).filter((x) => x.type === 'text').map((x) => x.text).join('\n').trim();
  if (!text) { await refund(); throw new HttpsError('unavailable', 'Empty answer'); }
  return { text };
});
