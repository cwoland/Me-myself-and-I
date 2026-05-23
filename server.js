require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
        if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
    }
}));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

function validate(data) {
    const errors = [];
    if (!data.name || data.name.trim().length < 2) errors.push('Некорректное имя');
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Некорректный email');
    if (!data.phone || !/^\+?[\d\s\-()]{7,}$/.test(data.phone)) errors.push('Некорректный телефон');
    return errors;
}

const contactLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Превышен лимит запросов'
    }
});

app.post('/api/contact/', contactLimiter, async (req, res) => {
    const { name, phone, email, comment } = req.body;

    const errors = validate({ name, phone, email });
    if (errors.length) {
        return res.status(400).json({ success: false, errors });
    }

    try {
        await transporter.sendEmail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: `Новое сообщение от ${name}`,
            html: `
            <h2>Новое сообщение с сайта</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Комментарий:</strong> ${comment || '—'}</p>
            `,
        });

        await transporter.sendMail({
           from: `"Anton Портфолио" <${process.env.EMAIL_USER}>`,
           to: email,
           subject: 'Ваше сообщение получено',
           html: `
           <h2>Привет, ${name}!</h2>
           <p>Ваше сообщение получено. Я свяжусь с вами в ближайшее время.</p>
           <hr/>
           <p><em>Ваш комментарий:</em> ${comment || '—'}</p>
           `,
        });

        res.json({ success: true, message: 'Сообщение отправлено!' });
    } catch (err) {
        console.error('Mail error:', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера при отправке письма' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});