# Frontend Developer Portfolio

Персональный лендинг с формой обратной связи и Node.js backend.

## Как запустить

### Требования
- Node.js 18+
- npm

### Локальный запуск

```bash
git clone https://github.com/cwoland/Me-myself-and-I.git
cd portfolio
npm install
```
файл `.env` в корне проекта:

```
PORT=3000
EMAIL_USER=example@gmail.com
EMAIL_PASS=app_password
OWNER_EMAIL=example@gmail.com
```

```bash
npm start
```

Открыть `http://localhost:3000`

---

## Стек

| Слой       | Технологии                          |
|------------|-------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JS (ES6+)      |
| Backend    | Node.js, Express                    |
| Email      | Nodemailer + Gmail SMTP             |
| Deploy     | Render / Railway (backend), статика |

---

## Как реализована форма

1. **Клиентская валидация** — проверка полей до отправки (JS, `main.js`)
2. **Fetch API** — POST-запрос на `/api/contact` с JSON-телом
3. **Серверная валидация** — повторная проверка на `server.js`
4. **Nodemailer** — два письма: владельцу и копия пользователю
5. **Состояния UI:** `loading` (кнопка disabled + текст), `success` (зелёный блок), `error` (красный блок)

---

## AI-инструменты

- **Claude (Anthropic)** — второй пилот разработки

---

## Что делалось с помощью ИИ

- Логика `server.js`: маршрут `/api/contact`, валидация, Nodemailer
- Дебаг `main.js`: поиск проблем в модальных окнах, валидации форм
- Шаблон README

---

## Что исправлялось вручную

- Вёрстка и CSS (дизайн, адаптив, анимации)
- Модальные окна с контентом (проекты, стек, опыт)
- Настройка Gmail App Password
- Деплой и переменные окружения на хостинге