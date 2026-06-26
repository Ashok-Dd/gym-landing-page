'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Activity,
  BarChart3,
  CalendarDays,
  Utensils,
  BellRing,
  WifiOff,
} from 'lucide-react';

const FEATURES = [
  {
    Icon: Activity,
    title: 'Live Workout Tracking',
    desc: 'Real-time reps, sets, and rest timers synced with your wearable.',
  },
  {
    Icon: BarChart3,
    title: 'Progress Analytics',
    desc: 'Visualise strength gains, body composition, and cardio improvements over time.',
  },
  {
    Icon: CalendarDays,
    title: 'Smart Scheduling',
    desc: 'AI-powered class booking that adapts to your recovery and goals.',
  },
  {
    Icon: Utensils,
    title: 'Nutrition Coaching',
    desc: 'Log meals, hit macros, and receive feedback from your coach in real-time.',
  },
  {
    Icon: BellRing,
    title: 'Trainer Notifications',
    desc: 'Instant updates, form corrections, and motivation from your personal trainer.',
  },
  {
    Icon: WifiOff,
    title: 'Offline Mode',
    desc: 'Access workout plans, history, and exercises even without an internet connection.',
  },
];

const SCREEN_STATS = [
  { value: '12', unit: '/14', label: 'Workouts' },
  { value: '8',  unit: ' days', label: 'Streak' },
  { value: '82', unit: '%', label: 'Goal' },
];

const EXERCISES = ['Bench Press  ·  4×8', 'Squat  ·  5×5', 'Deadlift  ·  3×6'];

export default function MobileApp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="app" className="py-28 bg-forge-card overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Ambient glow — explicitly centered on the phone */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: '340px',
                height: '460px',
                background: 'radial-gradient(ellipse at center, rgba(230,57,70,0.35) 0%, rgba(244,162,97,0.15) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Outer shadow ring */}
            <div className="relative p-[3px] rounded-[48px]"
                 style={{ background: 'linear-gradient(145deg,#e63946,#f4a261,#222)' }}>
              {/* Phone body */}
              <div className="relative w-[270px] h-[570px] bg-[#0f0f0f] rounded-[46px] overflow-hidden shadow-2xl">

                {/* Dynamic island / notch */}
                <div className="w-[100px] h-7 bg-black rounded-b-[18px] mx-auto mt-0 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1c1c1c]" />
                  <div className="w-4 h-4 rounded-full bg-[#1c1c1c]" />
                </div>

                <div className="px-4 pt-3 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading text-white/50 text-sm leading-tight">Good morning,</p>
                      <p className="font-heading text-white text-xl leading-tight">Alex ⚡</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-forge-card border border-forge-border flex items-center justify-center">
                      <span className="font-heading text-forge-red text-sm">AE</span>
                    </div>
                  </div>

                  {/* Today's program card */}
                  <div
                    className="p-4 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
                  >
                    <p className="font-body text-white/75 text-[10px] tracking-widest mb-1">TODAY&apos;S PROGRAM</p>
                    <p className="font-heading text-white text-2xl leading-tight">Strength Day</p>
                    <div className="flex gap-3 mt-2">
                      <span className="font-body text-white/75 text-[11px]">60 min</span>
                      <span className="font-body text-white/75 text-[11px]">580 kcal</span>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {SCREEN_STATS.map((s) => (
                      <div key={s.label} className="bg-[#1a1a1a] rounded-xl p-3 text-center">
                        <p className="font-heading text-forge-red text-lg leading-none">
                          {s.value}<span className="text-xs text-white/40">{s.unit}</span>
                        </p>
                        <p className="font-body text-white/40 text-[10px] mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Exercise list */}
                  <p className="font-body text-white/40 text-[10px] tracking-wider uppercase">Exercises</p>
                  {EXERCISES.map((ex, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-[#1a1a1a] rounded-xl px-4 py-3"
                    >
                      <p className="font-body text-white text-xs">{ex}</p>
                      <div
                        className="w-4 h-4 rounded-full border border-forge-red/40 flex items-center justify-center"
                      >
                        {i === 0 && <div className="w-2 h-2 rounded-full bg-forge-red" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Home bar */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* ── Features ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
                Mobile App
              </p>
              <h2
                className="font-heading text-white leading-none mb-4"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
              >
                Train Smarter.{' '}
                <span className="text-forge-red">Anywhere.</span>
              </h2>
              <p className="font-body text-forge-muted leading-relaxed mb-8">
                The AEVUM app puts your entire gym experience in your pocket. Track workouts,
                follow nutrition plans, and stay connected with your trainer — from anywhere.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.25)' }}
                  >
                    <f.Icon size={17} className="text-forge-red" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="font-body font-bold text-white text-sm mb-1">{f.title}</h4>
                    <p className="font-body text-forge-muted text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* App download buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              {/* App Store */}
              <button className="flex items-center gap-3 bg-white text-forge-dark px-5 py-3 rounded-xl font-body font-bold text-sm transition-all hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-xl">
                <svg width="20" height="24" viewBox="0 0 170 170" fill="currentColor">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 01-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.017.17 2.033.17 3.241z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[9px] text-forge-dark/50 leading-none">Download on the</p>
                  <p className="text-sm font-bold leading-tight">App Store</p>
                </div>
              </button>

              {/* Google Play */}
              <button className="flex items-center gap-3 bg-forge-dark border border-forge-border text-white px-5 py-3 rounded-xl font-body font-bold text-sm transition-all hover:border-forge-red hover:-translate-y-0.5 hover:shadow-lg">
                <svg width="20" height="22" viewBox="0 0 24 26" fill="none">
                  <path d="M.44.56C.16.85 0 1.28 0 1.85v22.3c0 .57.16 1 .44 1.29l.07.07L13.18 13 .51.49.44.56z" fill="#4285F4"/>
                  <path d="M17.46 17.09l-4.28-4.09 4.28-4.09 4.83 2.74c1.38.78 1.38 2.06 0 2.84l-4.83 2.6z" fill="#FFBC00"/>
                  <path d="M17.46 17.09L13.18 13 .44 25.44c.45.48 1.2.54 2.05.06l14.97-8.41z" fill="#EA4335"/>
                  <path d="M.44.56L13.18 13l4.28-4.09L2.49.06C1.64-.42.89-.36.44.56z" fill="#31A853"/>
                </svg>
                <div className="text-left">
                  <p className="text-[9px] text-forge-muted leading-none">Get it on</p>
                  <p className="text-sm font-bold leading-tight">Google Play</p>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
