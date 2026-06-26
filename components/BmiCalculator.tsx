'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';

type Unit = 'metric' | 'imperial';

interface BmiResult {
  value: number;
  category: string;
  color: string;
  pct: number;
  advice: string;
}

const CATEGORIES = [
  { max: 18.5, label: 'Underweight', color: '#3b82f6', pct: 8,  advice: 'Our trainers will build a calorie-surplus nutrition plan with targeted strength training to reach your ideal weight.' },
  { max: 25,   label: 'Normal Weight', color: '#22c55e', pct: 35, advice: 'Great baseline! Focus on performance, muscle definition, and maintaining your healthy composition.' },
  { max: 30,   label: 'Overweight', color: '#f59e0b', pct: 63, advice: 'A smart cardio + resistance training plan will efficiently bring you back to your ideal range.' },
  { max: Infinity, label: 'Obese', color: '#ef4444', pct: 88, advice: 'Our expert team will create a safe, sustainable, and highly effective path to transformation — step by step.' },
];

export default function BmiCalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [unit, setUnit] = useState<Unit>('metric');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    let bmi: number;
    if (unit === 'metric') {
      const h = parseFloat(heightCm) / 100;
      const w = parseFloat(weightKg);
      if (!h || !w || h < 0.5 || h > 2.5 || w < 20) {
        setError('Please enter valid height and weight.');
        return;
      }
      bmi = w / (h * h);
    } else {
      const h = parseFloat(heightFt) * 12;
      const w = parseFloat(weightLbs);
      if (!h || !w || h < 20 || w < 40) {
        setError('Please enter valid height and weight.');
        return;
      }
      bmi = (w / (h * h)) * 703;
    }
    const rounded = Math.round(bmi * 10) / 10;
    const cat = CATEGORIES.find((c) => rounded < c.max)!;
    setResult({ value: rounded, category: cat.label, color: cat.color, pct: cat.pct, advice: cat.advice });
  };

  return (
    <section id="bmi" className="py-28 bg-[#080808]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Free Tool
          </p>
          <h2 className="font-heading text-white leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            Check Your <span className="text-forge-red">BMI</span>
          </h2>
          <p className="font-body text-forge-muted mt-3">Know where you stand. Start your journey with clarity.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-forge-card border border-forge-border rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-12"
        >
          {/* Form */}
          <div>
            {/* Unit toggle */}
            <div className="flex bg-forge-dark border border-forge-border rounded-full p-1 gap-1 w-fit mb-8">
              {(['metric', 'imperial'] as Unit[]).map((u) => (
                <button
                  key={u}
                  onClick={() => { setUnit(u); setResult(null); setError(''); }}
                  className={`relative px-5 py-2 rounded-full font-body font-bold text-sm tracking-wider transition-colors duration-300 capitalize ${
                    unit === u ? 'text-white' : 'text-forge-muted hover:text-white'
                  }`}
                >
                  {unit === u && (
                    <motion.span
                      layoutId="bmi-unit-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{u}</span>
                </button>
              ))}
            </div>

            {unit === 'metric' ? (
              <div className="space-y-4">
                <div className="input-float-group">
                  <input id="hcm" type="number" placeholder=" " value={heightCm} onChange={e => setHeightCm(e.target.value)} min="100" max="250" />
                  <label htmlFor="hcm">Height (cm)</label>
                </div>
                <div className="input-float-group">
                  <input id="wkg" type="number" placeholder=" " value={weightKg} onChange={e => setWeightKg(e.target.value)} min="30" max="300" />
                  <label htmlFor="wkg">Weight (kg)</label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="input-float-group">
                  <input id="hft" type="number" placeholder=" " value={heightFt} onChange={e => setHeightFt(e.target.value)} min="3" max="8" step="0.1" />
                  <label htmlFor="hft">Height (ft)</label>
                </div>
                <div className="input-float-group">
                  <input id="wlbs" type="number" placeholder=" " value={weightLbs} onChange={e => setWeightLbs(e.target.value)} min="60" max="700" />
                  <label htmlFor="wlbs">Weight (lbs)</label>
                </div>
              </div>
            )}

            {error && <p className="font-body text-forge-red text-sm mt-3">{error}</p>}

            <button
              onClick={calculate}
              className="w-full mt-6 py-4 rounded-xl font-body font-bold tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(230,57,70,0.4)]"
              style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
            >
              Calculate BMI
            </button>
          </div>

          {/* Result */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                  className="w-full"
                >
                  <div className="text-center mb-6">
                    <motion.p
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="font-heading leading-none"
                      style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', color: result.color }}
                    >
                      {result.value}
                    </motion.p>
                    <p className="font-heading text-2xl mt-1" style={{ color: result.color }}>
                      {result.category}
                    </p>
                  </div>

                  {/* Scale */}
                  <div className="mb-6">
                    <div className="bmi-scale-bar relative mb-2">
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-5 rounded-sm bg-white shadow-lg"
                        initial={{ left: '50%' }}
                        animate={{ left: `${result.pct}%` }}
                        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                        style={{ marginLeft: -6 }}
                      />
                    </div>
                    <div className="grid grid-cols-4 text-[10px] font-body text-forge-muted mt-3">
                      <span>Under-weight</span>
                      <span className="text-center">Normal</span>
                      <span className="text-center">Overweight</span>
                      <span className="text-right">Obese</span>
                    </div>
                  </div>

                  <p className="font-body text-white/70 text-sm leading-relaxed mb-6 italic">
                    {result.advice}
                  </p>

                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-3 rounded-xl font-body font-bold text-sm tracking-wider text-white transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
                  >
                    Get a Custom Plan →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-forge-muted"
                >
                  <div className="mb-4 opacity-25 flex justify-center">
                    <Calculator size={52} className="text-forge-muted" strokeWidth={1} />
                  </div>
                  <p className="font-body text-sm leading-relaxed">
                    Enter your measurements<br />to see your BMI result
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
