'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { index: '01', value: 5000, suffix: '+', label: 'Active Members',      sub: 'and growing every month',       pct: 88 },
  { index: '02', value: 10,   suffix: '+', label: 'Years of Excellence', sub: 'forging champions since 2014',  pct: 56 },
  { index: '03', value: 50,   suffix: '+', label: 'Expert Trainers',     sub: 'certified and dedicated',       pct: 72 },
  { index: '04', value: 100,  suffix: '+', label: 'Weekly Classes',      sub: 'for every skill level',         pct: 92 },
];

function CountUp({ value, animate }: { value: number; animate: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!animate || started.current) return;
    started.current = true;
    const steps = 80;
    const duration = 2200;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(value * eased));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [animate, value]);
  return <>{count.toLocaleString()}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="stats" ref={ref} className="relative overflow-hidden bg-black">

      {/* Atmospheric red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(230,57,70,0.1) 0%, transparent 65%)',
        }}
      />

      {/* Top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(230,57,70,0.6) 50%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20 relative">

        {/* ── Section heading ── */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <p
            className="font-body font-bold tracking-[0.4em] text-xs uppercase mb-4"
            style={{ color: 'rgba(230,57,70,0.75)' }}
          >
            Performance Metrics
          </p>
          <h2
            className="font-heading text-white leading-none mb-3"
            style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', letterSpacing: '0.04em' }}
          >
            THE NUMBERS{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #e63946, #f4a261)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              DON&apos;T LIE.
            </span>
          </h2>
          <p className="font-body text-forge-muted text-sm max-w-xs mx-auto leading-relaxed">
            A decade of transformations, measurable in every rep.
          </p>
        </motion.div>

        {/* ── Stats grid ──
            gap-px + container background = 1 px dividers between cells naturally */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.13, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col bg-black px-5 sm:px-8 lg:px-10 py-8 lg:py-12 group"
              style={{ transition: 'background 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#050505')}
              onMouseLeave={e => (e.currentTarget.style.background = '#000')}
            >
              {/* Index tag */}
              <span
                className="font-body text-[9px] tracking-[0.3em] mb-4 block select-none"
                style={{ color: 'rgba(230,57,70,0.4)' }}
              >
                {stat.index}
              </span>

              {/* Animated accent bar */}
              <motion.div
                className="rounded-full mb-5"
                style={{ height: '2px', background: 'linear-gradient(90deg, #e63946, #f4a261)' }}
                initial={{ width: 0 }}
                animate={inView ? { width: 44 } : { width: 0 }}
                transition={{ delay: i * 0.13 + 0.4, duration: 0.55, ease: 'easeOut' }}
              />

              {/* Number + suffix */}
              <div className="flex items-baseline gap-1 mb-4 group-hover:-translate-y-0.5 transition-transform duration-300">
                <span
                  className="font-heading leading-none select-none"
                  style={{
                    fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
                    background: 'linear-gradient(160deg, #ffffff 20%, rgba(255,255,255,0.55) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  <CountUp value={stat.value} animate={inView} />
                </span>
                <span
                  className="font-heading leading-none select-none"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 3.5rem)',
                    background: 'linear-gradient(135deg, #e63946, #f4a261)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Animated progress track */}
              <div
                className="w-full rounded-full overflow-hidden mb-4"
                style={{ height: '2px', background: 'rgba(255,255,255,0.07)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(230,57,70,0.9), rgba(244,162,97,0.6))',
                  }}
                  initial={{ width: '0%' }}
                  animate={inView ? { width: `${stat.pct}%` } : { width: '0%' }}
                  transition={{ delay: i * 0.13 + 0.65, duration: 1.2, ease: 'easeOut' }}
                />
              </div>

              {/* Label */}
              <p className="font-body font-bold uppercase tracking-[0.15em] text-white text-xs sm:text-sm mb-1">
                {stat.label}
              </p>
              {/* Sub description */}
              <p className="font-body text-forge-muted text-[11px] sm:text-xs leading-relaxed">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(230,57,70,0.6) 50%, transparent)',
        }}
      />
    </section>
  );
}
