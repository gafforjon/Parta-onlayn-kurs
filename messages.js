// Тексты уведомлений (RU/UZ). Чистые функции — их можно тестировать без Firebase.
const clip = (s, n) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, n);
const T = {
  chat: { ru: (a, b) => ({ title: a, body: b }), uz: (a, b) => ({ title: a, body: b }) },
  homework: {
    ru: (a, b) => ({ title: 'Новое задание · ' + a, body: b }),
    uz: (a, b) => ({ title: 'Yangi topshiriq · ' + a, body: b }),
  },
  test: {
    ru: (a, b) => ({ title: 'Новый тест · ' + a, body: b }),
    uz: (a, b) => ({ title: 'Yangi test · ' + a, body: b }),
  },
  submission: {
    ru: (a, b) => ({ title: 'Ответ ученика: ' + a, body: b }),
    uz: (a, b) => ({ title: 'O‘quvchi javobi: ' + a, body: b }),
  },
};
exports.compose = (kind, lang, a, b) => {
  const f = (T[kind] || T.chat)[lang === 'uz' ? 'uz' : 'ru'];
  return f(clip(a, 60), clip(b, 120));
};
// users/{uid}/fcm = { "<token>": "ru" | "uz" }
exports.groupByLang = (fcm) => {
  const out = { ru: [], uz: [] };
  Object.entries(fcm || {}).forEach(([token, lang]) => out[lang === 'uz' ? 'uz' : 'ru'].push(token));
  return out;
};
