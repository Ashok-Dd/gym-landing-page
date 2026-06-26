'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ── LAYER 1: Static fallback image (always visible until video loads) ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.svg"
          alt="AEVUM Premium Gym"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── LAYER 2: Hero video — always in DOM so browser buffers it during loader ── */}
      <motion.div
        animate={{ opacity: videoPlaying ? 1 : 0 }}
        transition={{ duration: 2.5, ease: 'easeIn' }}
        className="absolute inset-0 overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setVideoPlaying(true)}
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max(100vw, calc(100vh * 16 / 9))',
            height: 'max(100vh, calc(100vw * 9 / 16))',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── LAYER 3: SVG grain texture ── */}
      <svg
        className="pointer-events-none fixed inset-0 w-full h-full z-[8] opacity-[0.04]"
        aria-hidden
      >
        <filter id="noise-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-hero)" />
      </svg>

      {/* ── LAYER 4: Gradient overlays ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.65) 100%)' }}
      />

      {/* ── LAYER 5: Content ── */}
      <div className="relative z-20 text-center px-6 w-full max-w-5xl mx-auto" style={{ paddingTop: '6vh' }}>

        {/* Eye-rule header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span
            className="block h-px flex-1 max-w-[80px]"
            style={{ background: 'linear-gradient(to right, transparent, #e63946)' }}
          />
          <span className="font-body text-forge-red font-bold tracking-[0.4em] text-xs uppercase whitespace-nowrap">
            Premium Fitness · Est. 2014
          </span>
          <span
            className="block h-px flex-1 max-w-[80px]"
            style={{ background: 'linear-gradient(to left, transparent, #e63946)' }}
          />
        </motion.div>

        {/* AEVUM wordmark */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-heading text-white leading-none"
            style={{ fontSize: 'clamp(5.5rem, 18vw, 16rem)' }}
            initial={{ y: 120, opacity: 0, skewY: 3 }}
            animate={{ y: 0, opacity: 1, skewY: 0 }}
            transition={{ delay: 0.35, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            AEVUM
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          className="font-heading text-forge-red mb-5"
          style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)', letterSpacing: '0.3em' }}
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ delay: 0.85, duration: 1 }}
        >
          ETERNAL STRENGTH.
        </motion.p>

        {/* Sub-copy */}
        <motion.p
          className="font-body text-white/55 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Elite training. Expert coaches. Legends made.
          Where every rep rewrites your story.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.7 }}
        >
          <button
            onClick={() => scrollTo('#programs')}
            className="px-10 py-4 font-body font-bold tracking-[0.08em] text-white rounded-lg uppercase text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(230,57,70,0.55)]"
            style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
          >
            Start Training
          </button>
          <button
            onClick={() => scrollTo('#about')}
            className="px-10 py-4 border border-white/30 backdrop-blur-sm text-white font-body font-bold tracking-[0.08em] uppercase text-sm rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:-translate-y-1"
          >
            Discover AEVUM
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 text-white/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="font-body text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.span
            className="block w-px h-10 rounded-full"
            style={{ background: 'linear-gradient(to bottom, rgba(230,57,70,0.8), transparent)' }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient bleed into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-20"
        style={{ background: 'linear-gradient(to top, #050505, transparent)' }}
      />
    </section>
  );
}
