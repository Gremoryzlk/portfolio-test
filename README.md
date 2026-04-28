# Portfolio Studio — Документация

Сайт-портфолио для веб-разработчика / дизайн-студии с двумя блоками работ: живые превью сайтов в iframe и слайдер скриншотов.

---

## Быстрый старт

```bash
# 1. Распаковать архив
unzip portfolio.zip && cd portfolio

# 2. Установить зависимости
npm install

# 3. Запустить локально
npm run dev       # http://localhost:3000

# 4. Собрать для продакшена
npm run build
npm run start
```

**Требования:** Node.js 18+

---

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx          # Корневой layout: шрифты, метаданные
│   ├── globals.scss        # CSS-переменные, reset, grain-текстура
│   └── page.tsx            # Главная страница
│
├── data/
│   └── projects.ts         # ← ВСЕ данные проектов — редактировать здесь
│
└── components/
    ├── ArrowIcon/          # SVG-стрелки (не зависят от шрифта/ОС)
    ├── CustomCursor/       # Кастомный курсор
    ├── Header/             # Шапка с навигацией
    ├── Hero/               # Главный экран
    ├── IframeCard/         # Карточка с живым iframe-превью
    ├── LiveProjects/       # Блок «Живые проекты»
    ├── Modal/              # Модальное окно для скриншотов
    ├── ScreenshotSlider/   # Слайдер скриншотов
    └── Footer/             # Подвал с контактами
```

---

## Добавление проектов

Все проекты хранятся в одном файле: **`src/data/projects.ts`**

### Живые проекты (iframe-превью)

```ts
export const liveProjects: LiveProject[] = [
  {
    id: "lp-01",            // уникальный id (любая строка)
    title: "Название",      // отображается в карточке
    description: "Описание проекта",
    stack: ["HTML", "CSS", "JavaScript"],  // теги стека
    url: "https://ваш-сайт.com/",         // URL для iframe
    year: "2024",
  },
  // ... добавляйте нужное количество
];
```

> **Важно:** используйте только собственные сайты или сайты без заголовка
> `X-Frame-Options`. Крупные сервисы (Vercel dashboard, Stripe, Notion и т.п.)
> блокируют встраивание — iframe не загрузится.

### Проекты со скриншотами (слайдер)

```ts
export const screenshotProjects: ScreenshotProject[] = [
  {
    id: "sp-01",
    title: "Название",
    description: "Описание",
    category: "Landing",     // отображается в оверлее при наведении
    year: "2024",
    screenshots: [
      "/images/project1-screen1.png",   // локальный путь из /public
      "/images/project1-screen2.png",   // можно несколько скриншотов
      "https://cdn.example.com/img.jpg" // или внешний URL
    ],
    url: "https://project-url.com/",    // необязательно
  },
];
```

**Рекомендации по скриншотам:**
- Размещайте файлы в папке `public/images/`
- Портретные (высокие) скриншоты показываются целиком (`object-fit: contain`)
- Оптимальная ширина — 1200–1600px, формат WebP или PNG
- При нескольких скриншотах в модалке появляется полоска миниатюр

---

## Персонализация

### Имя и позиционирование

**`src/app/layout.tsx`** — заголовок и описание вкладки:

```ts
export const metadata: Metadata = {
  title: 'Studio — Web Development & Design',
  description: 'Portfolio showcase...',
};
```

**`src/components/Hero/Hero.tsx`** — главный экран:

```tsx
<h1>
  Crafting<br />
  <em>Digital</em><br />
  Experiences
</h1>
<p>Разрабатываю продукты, которые запоминаются...</p>
```

**`src/components/Header/Header.tsx`** — логотип:

```tsx
<span className={styles.logoText}>Studio</span>  // ← ваше название
```

### Контакты и соцсети

**`src/components/Footer/Footer.tsx`**:

```ts
const socials = [
  { label: 'GitHub',   href: 'https://github.com/ваш-логин' },
  { label: 'Telegram', href: 'https://t.me/ваш-логин' },
  { label: 'WhatsApp', href: 'https://wa.me/79001234567' },
];
```

Почту:
```tsx
<a href="mailto:ваша@почта.com">ваша@почта.com</a>
```

### Цветовая схема

**`src/app/globals.scss`** — все цвета в CSS-переменных:

```scss
:root {
  --bg: #080808;           // фон страницы
  --bg-card: #111111;      // фон карточек
  --text-primary: #F2EDE4; // основной текст
  --text-secondary: #888880;
  --text-muted: #444440;
  --accent: #C9A357;       // золотой акцент — замените на свой
  --accent-light: #E8C07D;
}
```

### Шрифты

**`src/app/layout.tsx`** — шрифты подключены из Google Fonts:

```tsx
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap"
  rel="stylesheet"
/>
```

Переменные в `globals.scss`:
```scss
--font-display: 'Cormorant Garamond', Georgia, serif;  // заголовки
--font-body: 'DM Mono', 'Courier New', monospace;      // текст
```

### Favicon

Файл: `public/favicon.svg` — SVG с символом `✦` на тёмном фоне.
Замените на свой логотип в любом формате (`.svg`, `.ico`, `.png`).

В `layout.tsx`:
```tsx
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```

---

## Настройка слайдера

**`src/components/ScreenshotSlider/ScreenshotSlider.tsx`**:

```ts
const MANUAL_PAUSE_DURATION = 15_000; // пауза после ручного переключения (мс)
const AUTO_INTERVAL = 15_000;         // интервал автоматической смены слайдов (мс)
const SWIPE_THRESHOLD = 40;           // минимальный свайп в пикселях
```

---

## Деплой

### Vercel (рекомендуется)

```bash
npm install -g vercel
vercel          # следуйте инструкциям
```

Или подключите GitHub-репозиторий на [vercel.com](https://vercel.com) — деплой происходит автоматически при каждом push.

### GitHub Pages

GitHub Pages не поддерживает Next.js App Router напрямую.
Используйте статический экспорт:

```js
// next.config.js
const nextConfig = {
  output: 'export',
};
```

```bash
npm run build   # создаст папку /out
```

Загрузите содержимое `/out` в ветку `gh-pages`.

### Другой хостинг (VPS, Nginx)

```bash
npm run build
npm run start   # запуск на порту 3000
```

Настройте Nginx как reverse proxy на порт 3000.

---

## Часто задаваемые вопросы

**Сайт не загружается в iframe-карточке**
Большинство крупных сайтов блокируют встраивание через `X-Frame-Options: DENY` или `Content-Security-Policy: frame-ancestors`. Это их политика безопасности — обойти невозможно. Используйте только собственные сайты.

**Как добавить больше 4 живых проектов?**
Просто добавьте объекты в массив `liveProjects` в `projects.ts`. Сетка использует `auto-fill` и автоматически адаптирует количество колонок.

**Как изменить текст «Crafting Digital Experiences»?**
Откройте `src/components/Hero/Hero.tsx` и отредактируйте содержимое тега `<h1>`.

**Как отключить зернистую текстуру (grain)?**
В `src/app/globals.scss` найдите `body::after` и удалите этот блок целиком.

**Как отключить кастомный курсор?**
Удалите `<CustomCursor />` из `src/app/page.tsx` и строку `cursor: none` из `body` в `globals.scss`.

---

## Технологии

| Технология | Версия | Назначение |
|---|---|---|
| Next.js | 14 | App Router, SSG |
| TypeScript | 5 | Типизация |
| SCSS Modules | — | Стили компонентов |
| Framer Motion | 11 | Анимации |
