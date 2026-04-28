'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenshotProject } from '@/data/projects';
import ArrowIcon from '@/components/ArrowIcon/ArrowIcon';
import styles from './Modal.module.scss';

interface Props {
  project: ScreenshotProject | null;
  activeImage: number;
  onClose: () => void;
  onImageChange: (i: number) => void;
}

export default function Modal({ project, activeImage, onClose, onImageChange }: Props) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!project) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onImageChange(Math.min(activeImage + 1, project.screenshots.length - 1));
    if (e.key === 'ArrowLeft') onImageChange(Math.max(activeImage - 1, 0));
  }, [project, activeImage, onClose, onImageChange]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    if (project) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey, project]);

  const hasMultiple = (project?.screenshots.length ?? 0) > 1;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Галерея: ${project.title}`}
        >
          <motion.div
            className={styles.lightbox}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Top bar ─────────────────────────────────────────────── */}
            <div className={styles.topBar}>
              <div className={styles.meta}>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.title}>{project.title}</span>
              </div>
              <div className={styles.topActions}>
                {/* Opens the current screenshot image in a new tab */}
                <a
                  href={project.screenshots[activeImage]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openBtn}
                  data-cursor="hover"
                  aria-label="Открыть изображение в новой вкладке"
                >
                  Открыть изображение
                  <ArrowIcon direction="up-right" size={12} />
                </a>
                <button
                  className={styles.closeBtn}
                  onClick={onClose}
                  data-cursor="hover"
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Image area ──────────────────────────────────────────── */}
            <div className={styles.imageArea}>
              {hasMultiple && (
                <button
                  className={`${styles.navBtn} ${styles.navBtnLeft}`}
                  onClick={() => onImageChange(Math.max(activeImage - 1, 0))}
                  disabled={activeImage === 0}
                  data-cursor="hover"
                  aria-label="Предыдущее фото"
                >
                  <ArrowIcon direction="left" size={16} />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={`${project.id}-${activeImage}`}
                  src={project.screenshots[activeImage]}
                  alt={`${project.title} — скриншот ${activeImage + 1}`}
                  className={styles.image}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.22 }}
                  draggable={false}
                />
              </AnimatePresence>

              {hasMultiple && (
                <button
                  className={`${styles.navBtn} ${styles.navBtnRight}`}
                  onClick={() => onImageChange(Math.min(activeImage + 1, project.screenshots.length - 1))}
                  disabled={activeImage === project.screenshots.length - 1}
                  data-cursor="hover"
                  aria-label="Следующее фото"
                >
                  <ArrowIcon direction="right" size={16} />
                </button>
              )}
            </div>

            {/* ── Thumbnail strip ─────────────────────────────────────── */}
            {hasMultiple && (
              <div className={styles.thumbStrip}>
                {project.screenshots.map((src, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                    onClick={() => onImageChange(i)}
                    data-cursor="hover"
                    aria-label={`Фото ${i + 1}`}
                  >
                    <img src={src} alt="" draggable={false} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
