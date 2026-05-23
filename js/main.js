document.addEventListener('DOMContentLoaded', () => {

const modalContent = {
    about: {
        title: 'Обо мне',
        html: `
        <p>Junior+ Web-Developer. Работаю с Vue.js, HTML/CSS и библиотеками, JavaScript/TypeScript.</p>
        <p>Получил высшее образование в лингвистике, переводчик с английского, французского и испанского. Прошёл переквалификацию в IT. 
        Интересуюсь языками, дизайном, историей, программированием, обучаюсь самостоятельно и быстро осваиваю новый стек.
        <p><strong>Нынешний стек:</strong> Vue 3, React, JavaScript ES6+, HTML5, CSS3, node.js/Express, Git, GitHub, Figma, Claude, Copilot, Gemini.</p>
        <p><strong>Направления:</strong> SPA, адаптивная и семантическая верстка, UI/UX-компоненты.</p>
        `
    },
    approach: {
        title: 'Подход к задачам & AI',
        html: `
        <p>Руководствуюсь креативом и системным подходом. Сперва анализирую задачу и MVP, затем планирую архитектуру проекта, строю макет через Figma и ищу минимальные рабочие решения.</p>
        <p>Пишу чистый и читаемый код, использую AI как инструмент обучения, дебага и автоматизации рутинных процессов, а не замену мышления. Использую разные нейросети: ChatGPT 5.5, Claude, Copilot, Gemini, Cursor, DeepSeek. Всегда проверяю ответы.</p>
        `
    },
    projects: {
        title: 'Проекты',
        html: `
        <ul>
          <li><strong>KinoScope</strong> - Приложение для отслеживания фильмов на Vue 3 с использованием API. 
          Библиотека, избранное, профиль, фильтрация, валидация и регистрация реализованы с помощью Vuex & Vue-Router.
          <a href="https://cwoland.github.io/Portfolio/Kino/dist/index.html#/"><strong>Посмотреть</strong></a></li>
          <li><strong>Spotify Clone</strong> - Приложение-клон функционала Spotify на Vue 3 с использованием Vuex, Vue-Router, Axios, Howler, Spotify Dev API.
          Реализован с помощью Claude - дебаг, запросы к API, фикс лэйаута.
          <a href="https://cwoland.github.io/Portfolio/Musik/dist/index.html#/"><strong>Посмотреть</strong></a></li>
          <li><strong>Workout Log</strong> - Приложение-трекер тренировок, реализованное без использования фреймворков. 
          Записывает тренировки, упражнения и веса, расчитывает 1ПМ, подбирает программу и позволяет создавать свою программу. Отслеживает прогресс тренировок.
          <a href="https://cwoland.github.io/Portfolio/IronLog/index.html/"><strong>Посмотреть</strong></a></li>
          </ul>
        `
    },
    education: {
        title: 'Сертификаты и образование',
        html: `
        <p>ВГСПУ-2025, Лингвистика, профиль: "Перевод и переводоведение (Диплом с отличием). Языки: English - C2, French - C1, Spanish - B1.</p>
        <p>Переквалификация, курсы в приложении "Кодик", материалы из интернета. Сертификаты можно посмотреть по ссылке:
        <a href="https://cwoland.github.io/Portfolio/#skills"><strong>Посмотреть</strong></a>
        </p>
        `
    }
};

  const modal      = document.getElementById('modal');
  const modalBody  = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  function openModal(key) {
    const content = modalContent[key];
    if (!content) {
      console.error('Нет контента для ключа:', key);
      return;
    }
    modalBody.innerHTML = `<h2>${content.title}</h2>${content.html}`;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });

  window.addEventListener('scroll', () => {
    document.getElementById('header')
      .classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  const revealEls = document.querySelectorAll(
    '.snake-item__card, .footer__contacts, .footer__form-wrap'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });

  const form        = document.getElementById('contact-form');
  const submitBtn   = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');

  function setLoading(isLoading) {
    submitBtn.disabled    = isLoading;
    submitBtn.textContent = isLoading ? 'Отправка...' : 'Отправить';
    submitBtn.classList.toggle('loading', isLoading);
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className   = `form-message ${type}`;
    formMessage.style.display = 'block';
  }

  function validateForm(data) {
    if (data.name.trim().length < 2)              return 'Введите имя (минимум 2 символа)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Введите корректный email';
    if (!/^\+?[\d\s\-()]{7,}$/.test(data.phone)) return 'Введите корректный телефон';
    return null;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.style.display = 'none';

    const data = {
      name:    document.getElementById('f-name').value,
      phone:   document.getElementById('f-phone').value,
      email:   document.getElementById('f-email').value,
      comment: document.getElementById('f-comment').value,
    };

    const error = validateForm(data);
    if (error) { showMessage(error, 'error'); return; }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });

      if (response.status === 429) {
        showMessage('Превышен лимит запросов', 'error');
        return;
      }

      const result = await response.json();

      if (response.ok && result.success) {
        showMessage('✓ Сообщение отправлено! Копия придёт на вашу почту.', 'success');
        form.reset();
      } else {
        const text = result.errors ? result.errors.join(', ') : result.message;
        showMessage(`Ошибка: ${text}`, 'error');
      }
    } catch {
      showMessage('Ошибка соединения. Попробуйте позже.', 'error');
    } finally {
      setLoading(false);
    }
  });
});