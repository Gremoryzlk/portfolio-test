'use client';

import { motion } from 'framer-motion';
import IframeCard from '@/components/IframeCard/IframeCard';
import { liveProjects } from '@/data/projects';
import styles from './LiveProjects.module.scss';

export default function LiveProjects() {
  return (
    <section className={`section ${styles.section}`} id="live">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sectionLabel">Live Projects</div>
          <h2 className="sectionTitle">
            Живые<br />
            <em>сайты</em>
          </h2>
          <p className={styles.desc}>
            Реальные проекты — прямо здесь, в браузере.
            Можно скроллить внутри каждой карточки.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {liveProjects.map((project, i) => (
            <IframeCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.p
          className={styles.notice}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          ⓘ Если сайт не загружается — это ограничение хостинга или браузера.
        </motion.p>
      </div>
    </section>
  );
}
