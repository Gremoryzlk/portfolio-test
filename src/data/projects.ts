// ─── ПРОЕКТЫ С ЖИВЫМ IFRAME-ПРЕВЬЮ ───────────────────────────────────────────
export interface LiveProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
  url: string;
  year: string;
}

// ─── ПРОЕКТЫ СО СКРИНШОТАМИ ───────────────────────────────────────────────────
export interface ScreenshotProject {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  screenshots: string[];
  url?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Вставьте свои данные сюда
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Live iframe projects — ВАЖНО: используйте только свои сайты.
// Сторонние сервисы (Vercel, Stripe, Linear и т.д.) блокируют встраивание
// через X-Frame-Options / CSP frame-ancestors и вызывают ошибки в консоли.
// ─────────────────────────────────────────────────────────────────────────────

export const liveProjects: LiveProject[] = [
  {
    id: "lp-01",
    title: "atlas-voyage",
    description: "Современный лендинг с выразительной типографикой и плавными анимациями.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://gremoryzlk.github.io/atlas-voyage/",
    year: "2024",
  },
  {
    id: "lp-02",
    title: "pypath",
    description: "Сайт курсов на Python.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://gremoryzlk.github.io/pypath/",
    year: "2024",
  },
  {
    id: "lp-03",
    title: "lexora-law",
    description: "Сайт провавых услуг.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://gremoryzlk.github.io/lexora-law/",
    year: "2024",
  },
  {
    id: "lp-04",
    title: "stroygrad",
    description: "Сайт строительной компании.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://gremoryzlk.github.io/stroygrad/",
    year: "2024",
  },
];

export const screenshotProjects: ScreenshotProject[] = [
  {
    id: "sp-01",
    title: "7878",
    description: "Современный лендинг с выразительной типографикой и анимациями.",
    category: "Landing",
    year: "2024",
    // Replace with real screenshots of the site
    screenshots: [
      "/images/linguaflow/gremoryzlk.github.io_LinguaFlow_-1.png",
      "/images/linguaflow/gremoryzlk.github.io_LinguaFlow_-2.png",
      "/images/linguaflow/gremoryzlk.github.io_LinguaFlow_courses.html-3.png",
      "/images/linguaflow/gremoryzlk.github.io_LinguaFlow_teachers.html-4.png",
      "/images/linguaflow/gremoryzlk.github.io_LinguaFlow_reviews.html-5.png",
      "/images/linguaflow/gremoryzlk.github.io_LinguaFlow_contact.html-7.png",
    ],
    url: "/images/linguaflow/gremoryzlk.github.io_LinguaFlow_teachers.html-4.png",
  },
  {
    id: "sp-02",
    title: "Miel & Farine",
    description: "Сайт пекарни с тёплой эстетикой, меню и историей бренда.",
    category: "Restaurant",
    year: "2024",
    screenshots: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1400&q=85",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1400&q=85",
    ],
    url: "https://gremoryzlk.github.io/miel-farine/",
  },
  {
    id: "sp-03",
    title: "Velox Auto",
    description: "Автодилер — динамичный дизайн, каталог и форма заявки.",
    category: "Automotive",
    year: "2024",
    screenshots: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85",
    ],
    url: "https://gremoryzlk.github.io/velox-auto/",
  },
  {
    id: "sp-04",
    title: "Lapa Heart",
    description: "Приют для животных — эмоциональный дизайн, карточки питомцев.",
    category: "Non-profit",
    year: "2024",
    screenshots: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1400&q=85",
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1400&q=85",
    ],
    url: "https://gremoryzlk.github.io/lapa-heart/",
  },
];
