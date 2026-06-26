'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { Timer, Flame } from 'lucide-react';

type Tab = 'men' | 'women';

interface Program {
  title: string;
  level: string;
  duration: string;
  kcal: string;
  img: string;
  desc: string;
}

const MEN: Program[] = [
  {
    title: 'Strength & Power',
    level: 'All Levels',
    duration: '60 min',
    kcal: '600 kcal',
    img: '/images/programs/men-strength.webp',
    desc: 'Periodized lifting programs designed to build raw strength, muscle mass, and explosive power.',
  },
  {
    title: 'Cardio & Endurance',
    level: 'Beginner – Adv',
    duration: '45 min',
    kcal: '500 kcal',
    img: '/images/programs/men-cardio.webp',
    desc: 'High-performance cardio circuits that torch fat while building heart health and stamina.',
  },
  {
    title: 'HIIT & Athletics',
    level: 'Intermediate+',
    duration: '30 min',
    kcal: '450 kcal',
    img: '/images/programs/men-hiit.webp',
    desc: 'Intense interval training combining strength and speed drills for peak athletic performance.',
  },
];

const WOMEN: Program[] = [
  {
    title: 'Yoga & Flow',
    level: 'All Levels',
    duration: '60 min',
    kcal: '250 kcal',
    img: '/images/programs/women-yoga.webp',
    desc: 'Mindful movement sequences that build flexibility, balance, and inner strength.',
  },
  {
    title: 'Pilates & Core',
    level: 'Beginner – Adv',
    duration: '55 min',
    kcal: '350 kcal',
    img: '/images/programs/women-pilates.webp',
    desc: 'Targeted core work and full-body toning using Reformer and mat-based Pilates methods.',
  },
  {
    title: 'CrossFit & HIIT',
    level: 'Intermediate+',
    duration: '45 min',
    kcal: '480 kcal',
    img: '/images/programs/women-crossfit.webp',
    desc: 'Functional fitness at its hardest — WODs and high-intensity circuits that redefine your limits.',
  },
];

function ProgramCard({ p, i }: { p: Program; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, boxShadow: '0 24px 50px rgba(230,57,70,0.22)' }}
      className="bg-forge-card border border-forge-border rounded-2xl overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={p.img}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forge-dark/70 to-transparent" />
        {/* Hover overlay CTA */}
        <div className="absolute inset-0 bg-forge-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-body font-bold text-sm tracking-wider px-6 py-3 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
          >
            Get Started
          </button>
        </div>
        {/* Level badge */}
        <span className="absolute top-4 left-4 bg-forge-dark/80 text-forge-muted text-xs font-body font-semibold tracking-wider px-3 py-1.5 rounded-full border border-forge-border">
          {p.level}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="font-heading text-white text-2xl mb-2">{p.title}</h3>
        <p className="font-body text-forge-muted text-sm leading-relaxed mb-4">{p.desc}</p>
        <div className="flex gap-4 text-xs font-body font-semibold text-white/60 border-t border-forge-border pt-4">
          <span className="flex items-center gap-1.5"><Timer size={12} strokeWidth={1.8} />{p.duration}</span>
          <span className="flex items-center gap-1.5"><Flame size={12} strokeWidth={1.8} />{p.kcal}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Programs() {
  const [tab, setTab] = useState<Tab>('men');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="programs" className="py-28 bg-[#080808]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Training Programs
          </p>
          <h2 className="font-heading text-white leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            Built for{' '}
            <span className="text-forge-red">Every Goal</span>
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-forge-card border border-forge-border rounded-full p-1 gap-1">
            {(['men', 'women'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-8 py-3 rounded-full font-body font-bold text-sm tracking-wider uppercase transition-colors duration-300 ${
                  tab === t ? 'text-white' : 'text-forge-muted hover:text-white'
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {t === 'men' ? '♂ ' : '♀ '}{t === 'men' ? "Men's" : "Women's"}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(tab === 'men' ? MEN : WOMEN).map((p, i) => (
              <ProgramCard key={p.title} p={p} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
