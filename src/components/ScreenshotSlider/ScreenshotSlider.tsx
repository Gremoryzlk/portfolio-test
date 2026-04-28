'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import ArrowIcon from '@/components/ArrowIcon/ArrowIcon';
import { screenshotProjects, ScreenshotProject } from '@/data/projects';
import Modal from '@/components/Modal/Modal';
import styles from './ScreenshotSlider.module.scss';

const MANUAL_PAUSE_DURATION = 15_000;
const AUTO_INTERVAL = 15_000;
// Minimum horizontal distance (px) to register as a swipe
const SWIPE_THRESHOLD = 40;

export default function ScreenshotSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState<ScreenshotProject | null>(null);
  const [modalImage, setModalImage] = useState(0);
  const [paused, setPaused] = useState(false);

  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Touch tracking for native swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalSlides = screenshotProjects.length;

  const pauseFor = useCallback((ms: number) => {
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), ms);
  }, []);

  const goTo = useCallback((index: number) => {
    const wrapped = ((index % totalSlides) + totalSlides) % totalSlides;
    setActiveIndex(wrapped);
  }, [totalSlides]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const handleNext = useCallback(() => { next(); pauseFor(MANUAL_PAUSE_DURATION); }, [next, pauseFor]);
  const handlePrev = useCallback(() => { prev(); pauseFor(MANUAL_PAUSE_DURATION); }, [prev, pauseFor]);
  const handleGoTo = useCallback((i: number) => { goTo(i); pauseFor(MANUAL_PAUSE_DURATION); }, [goTo, pauseFor]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  useEffect(() => () => { if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current); }, []);

  // ── Native touch swipe ───────────────────────────────────────────────────
  // Using native events instead of Framer drag because:
  //   - Framer's pointer capture conflicts with browser scroll on touch
  //   - Native touch events give us direct control over axis detection
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Only count as horizontal swipe if horizontal movement dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) handleNext();
      else handlePrev();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }, [handleNext, handlePrev]);

  const openModal = useCallback((project: ScreenshotProject, imgIndex = 0) => {
    setModalProject(project);
    setModalImage(imgIndex);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  }, []);

  const closeModal = useCallback(() => {
    setModalProject(null);
    pauseFor(MANUAL_PAUSE_DURATION);
  }, [pauseFor]);

  return (
    <>
      <section className={styles.section} id="screenshots">
        <div className="container">
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="sectionLabel">Screenshot Projects</div>
              <h2 className="sectionTitle">
                Галерея<br /><em>работ</em>
              </h2>
            </div>

            <div className={styles.controls}>
              <span className={styles.counter}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
              <div className={styles.arrows}>
                <button className={styles.arrowBtn} onClick={handlePrev} data-cursor="hover" aria-label="Назад">
                  <ArrowIcon direction="left" size={14} />
                </button>
                <button className={styles.arrowBtn} onClick={handleNext} data-cursor="hover" aria-label="Вперёд">
                  <ArrowIcon direction="right" size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Clip zone — no padding so adjacent slides can't bleed through */}
        <div
          className={styles.clipZone}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.sliderInner}>
            <motion.div
              className={styles.track}
              animate={{ x: `-${(activeIndex / totalSlides) * 100}%` }}
              style={{ width: `${totalSlides * 100}%` }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {screenshotProjects.map((project, i) => (
                <div
                  key={project.id}
                  className={styles.slide}
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  <div
                    className={`${styles.card} ${i === activeIndex ? styles.active : ''}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => openModal(project)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openModal(project)}
                    aria-label={`Открыть ${project.title}`}
                    data-cursor="hover"
                  >
                    <div className={styles.imageWrap}>
                      <img
                        src={project.screenshots[0]}
                        alt={project.title}
                        className={styles.image}
                        loading="lazy"
                        draggable={false}
                      />
                      <div className={styles.overlay}>
                        <span className={styles.overlayIcon} aria-hidden="true">⊕</span>
                        <span className={styles.overlayTitle}>{project.title}</span>
                        <span className={styles.overlayCategory}>{project.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className={styles.dots}>
          {screenshotProjects.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => handleGoTo(i)}
              data-cursor="hover"
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>

        <div className={styles.progressBar}>
          <motion.div
            className={styles.progress}
            animate={{ width: `${((activeIndex + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </section>

      <Modal
        project={modalProject}
        activeImage={modalImage}
        onClose={closeModal}
        onImageChange={setModalImage}
      />
    </>
  );
}
