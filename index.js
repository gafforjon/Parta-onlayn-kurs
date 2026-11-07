// Cloud Functions для push-уведомлений PARTA (Realtime Database -> Firebase Cloud Messaging).
const { onValueCreated } = require('firebase-functions/v2/database');
const admin = require('firebase-admin');
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
