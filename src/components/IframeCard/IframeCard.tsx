'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LiveProject } from '@/data/projects';
import ArrowIcon from '@/components/ArrowIcon/ArrowIcon';
import styles from './IframeCard.module.scss';

interface Props {
  project: LiveProject;
  index: number;
}

export default function IframeCard({ project, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Glow still tracks the cursor via CSS vars — tilt removed per request
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardRef.current?.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current?.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMouseMove}
        data-cursor="hover"
      >
        {/* Browser chrome */}
        <div className={styles.browser}>
          <div className={styles.browserBar}>
            <div className={styles.dots} aria-hidden="true">
              <span style={{ background: '#FF5F57' }} />
              <span style={{ background: '#FFBD2E' }} />
              <span style={{ background: '#28CA41' }} />
            </div>
            <div className={styles.urlBar}>
              <span className={styles.urlIcon} aria-hidden="true">🔒</span>
              <span className={styles.urlText}>{project.url.replace('https://', '')}</span>
            </div>
          </div>

          <div className={styles.viewport}>
            {!isLoaded && (
              <div className={styles.skeleton} aria-hidden="true">
                <div className={styles.skeletonBar} style={{ width: '60%', height: 16 }} />
                <div className={styles.skeletonBar} style={{ width: '90%', height: 10 }} />
                <div className={styles.skeletonBar} style={{ width: '75%', height: 10 }} />
                <div className={styles.skeletonBlock} />
              </div>
            )}
            <iframe
              src={project.url}
              title={`Превью: ${project.title}`}
              className={`${styles.iframe} ${isLoaded ? styles.loaded : ''}`}
              onLoad={() => setIsLoaded(true)}
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Card footer — fixed height so all cards align perfectly */}
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <div className={styles.infoLeft}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.textBlock}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <p className={styles.aiNote} aria-label="Описание создано автоматически">
                  * Описание создано автоматически и может быть неточным
                </p>
              </div>
            </div>
            <div className={styles.infoRight}>
              <ul className={styles.stack} aria-label="Стек технологий">
                {project.stack.map((tech) => (
                  <li key={tech} className={styles.tag}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.infoBottom}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openBtn}
              aria-label={`Открыть ${project.title} в новой вкладке`}
              data-cursor="hover"
            >
              <ArrowIcon direction="up-right" size={11} />
              Открыть сайт
            </a>
          </div>
        </div>

        <div className={styles.glow} aria-hidden="true" />
      </div>
    </motion.div>
  );
}
