'use client';

import { motion } from 'framer-motion';
import styles from './Footer.module.scss';

const socials = [
  { label: 'GitHub',    href: 'https://github.com' },
  { label: 'Telegram',  href: 'https://t.me' },
  { label: 'WhatsApp',  href: 'https://wa.me' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.contactSection}>
        <div className="container">
          <motion.div
            className={styles.contactInner}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sectionLabel">Контакт</div>
            <h2 className={styles.contactTitle}>
              Есть проект?<br />
              <em>Поговорим.</em>
            </h2>

            <div className={styles.contactLinks}>
              <a href="mailto:hello@studio.dev" className={styles.email} data-cursor="hover">
                hello@studio.dev
                {/* U+FE0E = variation selector-15: forces text glyph on iOS/Android */}
                <span className={styles.emailArrow} aria-hidden="true">&#8599;&#xFE0E;</span>
              </a>
              <div className={styles.socials}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    data-cursor="hover"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className={styles.bar}>
        <div className="container">
          <div className={styles.barInner}>
            <span className={styles.barLeft}>
              <span className={styles.logoMark}>✦</span> Studio
            </span>
            <span className={styles.barRight}>
              © {new Date().getFullYear()} — Все права защищены
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
