'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [animDone, setAnimDone] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Detect when all resources (images, fonts, scripts) are fully loaded
  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageReady(true);
      return;
    }
    const onLoad = () => setPageReady(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Preload the hero video so it buffers during the loader phase
  useEffect(() => {
    const vid = document.createElement('video');
    vid.muted = true;
    vid.preload = 'auto';
    vid.src = '/videos/hero.mp4';

    const markReady = () => setVideoReady(true);
    vid.addEventListener('canplay', markReady);
    vid.addEventListener('error', markReady); // no video file → proceed

    // Don't wait more than 3s for the video after everything else is done
    const fallback = setTimeout(markReady, 3000);

    vid.load();

    return () => {
      vid.removeEventListener('canplay', markReady);
      vid.removeEventListener('error', markReady);
      clearTimeout(fallback);
      vid.src = '';
    };
  }, []);

  // Loader stays visible until: fill animation + page loaded + video can play
  const allReady = pageReady && videoReady;
  const show = !animDone || !allReady;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="site-loader"
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#050505' }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 35% at 50% 50%, rgba(230,57,70,0.06) 0%, transparent 70%)',
            }}
          />

          {/* AEVUM text — hollow → filled with gradient */}
          <div className="relative select-none mb-6" style={{ lineHeight: 1 }}>
            {/* Ghost outline layer */}
            <span
              aria-hidden
              className="font-heading block"
              style={{
                fontSize: 'clamp(4.5rem, 18vw, 12rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.08)',
                letterSpacing: '0.1em',
              }}
            >
              AEVUM
            </span>

            {/* Gradient fill — clip-path reveals left → right at linear speed */}
            <motion.span
              className="font-heading absolute inset-0 block"
              style={{
                fontSize: 'clamp(4.5rem, 18vw, 12rem)',
                background: 'linear-gradient(90deg, #e63946 0%, #f4a261 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '0.1em',
              }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 2.0, ease: 'linear' }}
              onAnimationComplete={() => setAnimDone(true)}
            >
              AEVUM
            </motion.span>
          </div>

          {/* Progress bar — tied to actual loading state */}
          <div
            className="overflow-hidden rounded-full"
            style={{
              width: 'min(360px, 55vw)',
              height: '1px',
              background: '#181818',
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #e63946, #f4a261)' }}
              initial={{ width: '0%' }}
              animate={{ width: allReady ? '100%' : animDone ? '78%' : '65%' }}
              transition={
                allReady
                  ? { duration: 0.4, ease: 'easeOut' }
                  : { duration: 2.0, ease: 'easeInOut' }
              }
            />
          </div>

          {/* Status text — shows real loading state */}
          <motion.p
            className="font-body text-[10px] tracking-[0.4em] uppercase mt-5"
            style={{ color: 'rgba(255,255,255,0.18)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {animDone && !allReady
              ? !pageReady ? 'Loading resources...' : 'Preparing video...'
              : 'Eternal Strength'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
