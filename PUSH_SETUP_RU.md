# Push-уведомления PARTA — настройка

Что приходит: новое сообщение в чате, новое задание, новый тест (ученикам класса), ответ ученика на задание (учителю).
Не реализовано: уведомления о расписании (расписания в проекте пока нет) и об оценках.

## Что нужно (я не могу сделать это за вас)
1. Firebase Console → переведите проект на тариф **Blaze** (Cloud Functions требуют его; для небольшой школы обычно в пределах бесплатной квоты, но карта нужна).
2. Установите Node.js 20 и выполните:
   `npm i -g firebase-tools` → `firebase login` → в папке проекта `cd functions && npm install && cd ..` → `firebase deploy --only functions,database`
   (команда `database` опубликует и firebase-rules.json).
3. Firebase Console → Project settings → Cloud Messaging → **Web Push certificates** → Generate key pair. Скопируйте ключ и вставьте в index.html в строку `window.PARTA_VAPID_KEY=...` (поиск: PARTA_VAPID_KEY), затем загрузите сайт на GitHub Pages.
4. Если имя вашей базы не `parta-onlayn-kurs-default-rtdb`, поправьте INSTANCE в functions/index.js.

## Как пользоваться
Войти → «Кабинет» → «Включить уведомления» → разрешить в браузере. При выходе из аккаунта устройство отписывается.

## Ограничения
- Нужен HTTPS (GitHub Pages подходит).
- iPhone: только iOS 16.4+ и только если сайт добавлен на экран «Домой».
- Часть телефонов задерживает push, если браузер выгружен из памяти.
- Это не проверено на вашем проекте: я не мог запустить Cloud Functions и FCM. После настройки проверьте двумя устройствами.
