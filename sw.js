// PARTA service worker: оффлайн-оболочка + push.
// ВАЖНО: при изменении index.html поднимайте VERSION, чтобы у пользователей обновился кэш.
const VERSION = 'v22';
const SHELL = 'parta-shell-' + VERSION;
const CDN = 'parta-cdn-v1';
const PRECACHE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './icon.svg', './favicon.ico', './favicon-48.png'];
const NAV_TIMEOUT = self.PARTA_NAV_TIMEOUT || 3000;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('parta-shell-') && k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const put = (name, req, res) => caches.open(name).then((c) => c.put(req, res));

// Страница: сеть в приоритете (свежая версия), при отсутствии сети или медленной сети — сохранённая копия.
const navigate = (e) => {
  const req = e.request;
  const net = fetch(req).then((r) => {
    if (r && r.ok) { const a = r.clone(), b = r.clone(); put(SHELL, './index.html', a); put(SHELL, req, b); }
    return r;
  });
  const cached = () => caches.match('./index.html').then((r) => r || caches.match(req));
  return new Promise((resolve, reject) => {
    let done = false;
    const fin = (v) => { if (!done) { done = true; resolve(v); } };
    const timer = setTimeout(() => cached().then((r) => { if (r) fin(r); }), NAV_TIMEOUT);
    net.then((r) => { clearTimeout(timer); fin(r); }, () => {
      clearTimeout(timer);
      cached().then((r) => (r ? fin(r) : reject(new Error('offline'))));
    });
  });
};
// Статические файлы своего сайта: сразу из кэша, в фоне обновляем.
const swr = (e) => caches.match(e.request).then((hit) => {
  const net = fetch(e.request).then((r) => { if (r && r.ok) put(SHELL, e.request, r.clone()); return r; });
  if (hit) { net.catch(() => {}); return hit; }
  return net;
});
// Скрипты Firebase SDK (gstatic): кэш в приоритете.
const cdn = (e) => caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
  if (r && (r.ok || r.type === 'opaque')) put(CDN, e.request, r.clone());
  return r;
}));

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === self.location.origin) { e.respondWith(r.mode === 'navigate' ? navigate(e) : swr(e)); return; }
  if (u.hostname === 'www.gstatic.com' && u.pathname.startsWith('/firebasejs/')) e.respondWith(cdn(e));
  // всё остальное (Firebase базы, YouTube, API) в кэш не попадает и идёт напрямую
});

// Push-уведомления (данные приходят из Cloud Functions как data-сообщение)
self.addEventListener('push', (event) => {
  let p = {};
  try { p = event.data ? event.data.json() : {}; } catch (e) {}
  const d = p.data || p.notification || p;
  event.waitUntil(self.registration.showNotification(d.title || 'PARTA', { body: d.body || '', data: { url: d.url || './' } }));
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || './', self.registration.scope).href;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ('focus' in c) { if (c.navigate) c.navigate(url); return c.focus(); } }
    return clients.openWindow(url);
  }));
});
