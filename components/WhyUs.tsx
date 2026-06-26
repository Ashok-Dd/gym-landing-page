'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Dumbbell, ShieldCheck, Clock, TrendingUp } from 'lucide-react';

const REASONS = [
  {
    Icon: Dumbbell,
    title: 'Elite Equipment',
    desc: 'Life Fitness & Technogym machines, Olympic platforms, and recovery pods — over $2M invested in your performance.',
  },
  {
    Icon: ShieldCheck,
    title: 'Certified Experts',
    desc: 'Every trainer holds NASM or ACE certification with a minimum of 5 years hands-on experience.',
  },
  {
    Icon: Clock,
    title: 'Open 24/7',
    desc: 'Access the facility any time of day, any day of the year. Your schedule, your rules — no exceptions.',
  },
  {
    Icon: TrendingUp,
    title: 'Proven Results',
    desc: '92% of our members achieve their 90-day transformation goal. Real data from real people.',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why" className="py-28 bg-forge-dark" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Why AEVUM
          </p>
          <h2
            className="font-heading text-white leading-none"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
          >
            The <span className="text-forge-red">Difference</span> You Feel
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -8, borderColor: '#e63946', boxShadow: '0 20px 45px rgba(230,57,70,0.18)' }}
              className="bg-forge-card border border-forge-border rounded-2xl p-8 text-center transition-colors duration-300 group"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
              >
                <r.Icon size={26} className="text-white" strokeWidth={1.8} />
              </div>
              <h3 className="font-heading text-white text-2xl mb-3">{r.title}</h3>
              <p className="font-body text-forge-muted text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
