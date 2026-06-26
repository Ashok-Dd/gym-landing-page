'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Quote, ArrowRight } from 'lucide-react';

interface Transformation {
  name: string;
  program: string;
  duration: string;
  stats: { value: string; label: string }[];
  quote: string;
  beforeImg: string;
  afterImg: string;
}

const TRANSFORMATIONS: Transformation[] = [
  {
    name: 'Raj Mehta',
    program: "Men's Strength Program",
    duration: '12 Weeks',
    stats: [
      { value: '-38 LBS', label: 'Total Lost' },
      { value: '+22 LBS', label: 'Muscle Built' },
      { value: '11%', label: 'Body Fat' },
    ],
    quote: '"I came in confused and overweight. I left unrecognisable. AEVUM didn\'t just change my body — it rewrote who I am."',
    beforeImg: '/images/gallery/raj-before.png',
    afterImg:  '/images/gallery/raj-after.png',
  },
  {
    name: 'Alicia Torres',
    program: "Women's Transformation",
    duration: '16 Weeks',
    stats: [
      { value: '-28 LBS', label: 'Total Lost' },
      { value: '3 Sizes', label: 'Dress Down' },
      { value: '16%', label: 'Body Fat' },
    ],
    quote: '"Priya completely transformed how I see fitness. I\'m stronger, leaner, and more confident than I\'ve ever been in my life."',
    beforeImg: '/images/gallery/alicia-before.png',
    afterImg:  '/images/gallery/alicia-after.png',
  },
  {
    name: 'Marcus Williams',
    program: 'HIIT & Cardio Elite',
    duration: '20 Weeks',
    stats: [
      { value: '-56 LBS', label: 'Total Lost' },
      { value: '+15 LBS', label: 'Muscle Built' },
      { value: '5×/week', label: 'Frequency' },
    ],
    quote: '"From 280 lbs and borderline diabetic, to running half-marathons. AEVUM literally saved my life."',
    beforeImg: '/images/gallery/marcus-before.png',
    afterImg:  '/images/gallery/marcus-after.png',
  },
];

function TransformCard({ t, i }: { t: Transformation; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gradient border wrapper */}
      <div
        className="rounded-3xl p-px"
        style={{ background: 'linear-gradient(135deg, rgba(230,57,70,0.35), rgba(30,30,30,0.6), rgba(244,162,97,0.2))' }}
      >
        <div className="rounded-[calc(1.5rem-1px)] overflow-hidden bg-[#0f0f0f] grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">

          {/* ── BEFORE ── */}
          <div className="relative min-h-[200px] lg:min-h-[300px]">
            <Image
              src={t.beforeImg}
              alt={`${t.name} before`}
              fill
              className="object-cover object-top"
              sizes="(max-width:1024px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/20" />
            <div className="absolute inset-0 bg-forge-dark/20" />
            {/* Label */}
            <div className="absolute top-5 left-5">
              <span className="font-body text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 border border-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                Before
              </span>
            </div>
            {/* Arrow bridge (desktop only) */}
            <div className="hidden lg:flex absolute inset-y-0 right-0 items-center justify-center w-6 z-10">
              <ArrowRight size={14} className="text-forge-red/50" />
            </div>
          </div>

          {/* ── CENTER: Stats + Info ── */}
          <div className="bg-[#111] border-y lg:border-y-0 lg:border-x border-white/[0.05] p-8 lg:p-10 flex flex-col justify-center">

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {t.stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center py-4 rounded-xl border border-white/[0.06]"
                  style={{ background: 'rgba(230,57,70,0.04)' }}
                >
                  <p
                    className="font-heading text-forge-red leading-none mb-1"
                    style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)' }}
                  >
                    {s.value}
                  </p>
                  <p className="font-body text-forge-muted text-[9px] tracking-widest uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Member info */}
            <div className="flex items-start justify-between gap-4 mb-5 pb-5 border-b border-white/[0.06]">
              <div>
                <h3 className="font-heading text-white leading-none" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)' }}>
                  {t.name}
                </h3>
                <p className="font-body text-forge-muted text-sm mt-1">{t.program}</p>
              </div>
              <span
                className="font-body text-[10px] font-bold tracking-wider uppercase text-white/60 border border-white/10 rounded-full px-3 py-1.5 whitespace-nowrap flex-shrink-0"
              >
                {t.duration}
              </span>
            </div>

            {/* Quote */}
            <div className="flex items-start gap-3">
              <Quote size={16} className="text-forge-red flex-shrink-0 mt-0.5 opacity-70" strokeWidth={1.5} />
              <p className="font-body text-white/45 text-sm leading-relaxed italic">{t.quote}</p>
            </div>
          </div>

          {/* ── AFTER ── */}
          <div className="relative min-h-[200px] lg:min-h-[300px]">
            <Image
              src={t.afterImg}
              alt={`${t.name} after`}
              fill
              className="object-cover object-top"
              sizes="(max-width:1024px) 100vw, 300px"
            />
            {/* Warm glow overlay on "after" side */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(230,57,70,0.18) 0%, rgba(244,162,97,0.1) 50%, transparent 100%)' }}
            />
            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20"
              style={{ background: 'linear-gradient(to top, rgba(230,57,70,0.12), transparent)' }}
            />
            {/* Label */}
            <div className="absolute top-5 right-5">
              <span
                className="font-body text-[10px] font-bold tracking-[0.3em] uppercase text-white px-3 py-1 rounded-full"
                style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
              >
                After
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="gallery" className="py-28 bg-forge-dark" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Transformations
          </p>
          <h2
            className="font-heading text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
          >
            Real People.{' '}
            <span className="text-forge-red">Real Results.</span>
          </h2>
          <p className="font-body text-forge-muted max-w-lg mx-auto text-sm leading-relaxed">
            Every number you see below came from relentless work, expert coaching,
            and trust in the AEVUM process. Yours is next.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-8">
          {TRANSFORMATIONS.map((t, i) => (
            <TransformCard key={t.name} t={t} i={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="font-body text-forge-muted text-sm mb-6">
            Ready to write your own transformation story?
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-body font-bold tracking-widest uppercase px-10 py-4 rounded-full text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(230,57,70,0.45)]"
            style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
          >
            Start Your Transformation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
