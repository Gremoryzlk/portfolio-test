'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArrowIcon from '@/components/ArrowIcon/ArrowIcon';
import styles from './Hero.module.scss';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className={styles.hero} ref={ref}>
      {/* Decorative grid lines */}
      <div className={styles.grid} aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.gridLine} />
        ))}
      </div>

      <motion.div className={styles.inner} style={{ y, opacity }}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className={styles.label}>
            <span>Available for projects</span>
            <span className={styles.dot} />
          </motion.div>

          <motion.h1 variants={item} className={styles.title}>
            Crafting<br />
            <em>Digital</em><br />
            Experiences
          </motion.h1>

          <motion.p variants={item} className={styles.subtitle}>
            Разрабатываю продукты, которые запоминаются —<br className={styles.br} />
            от концепции до деплоя.
          </motion.p>

          <motion.div variants={item} className={styles.actions}>
            <a href="#live" className={styles.btnPrimary} data-cursor="hover">
              Смотреть работы
              <span className={styles.arrow}>
                <ArrowIcon direction="down" size={13} strokeWidth={1.8} />
              </span>
            </a>
            <a href="#contact" className={styles.btnGhost} data-cursor="hover">
              Написать мне
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative large text */}
      <div className={styles.bgText} aria-hidden="true">Portfolio</div>
    </section>
  );
}
