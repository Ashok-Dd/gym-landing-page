'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

const features = [
  '15,000 sq ft state-of-the-art training floor',
  'Olympic-grade equipment by Life Fitness & Technogym',
  'Certified personal trainers on duty 24/7',
  'Dedicated Men\'s & Women\'s training zones',
  'Nutrition counselling & custom meal planning',
  'Recovery zone: sauna, cryo, massage therapy',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-28 bg-forge-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/about.png"
                alt="AEVUM gym equipment"
                width={700}
                height={550}
                className="w-full object-cover"
                style={{ height: '550px', objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forge-dark/30 to-transparent" />
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute bottom-4 right-4 sm:-bottom-6 sm:-right-6 p-4 sm:p-6 rounded-2xl shadow-2xl text-center"
              style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
            >
              <p className="font-heading text-5xl text-white leading-none">10</p>
              <p className="font-body text-xs text-white/80 tracking-wider leading-relaxed mt-1">
                YEARS OF<br />ELITE FITNESS
              </p>
            </motion.div>

            <div
              className="absolute top-8 -left-4 w-1 h-24 rounded-full"
              style={{ background: 'linear-gradient(#e63946,#f4a261)' }}
            />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
              Our Story
            </p>
            <h2
              className="font-heading text-white leading-none mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
            >
              We Don&apos;t Just Build{' '}
              <span className="text-forge-red">Bodies</span> —<br />
              We Build{' '}
              <span className="text-forge-red">Champions</span>
            </h2>
            <p className="font-body text-forge-muted leading-relaxed mb-8">
              Founded in 2014, AEVUM was built on one belief: every person has a champion inside.
              Our state-of-the-art facility brings together world-class coaches, premium equipment,
              and a culture of excellence that transforms lives every single day.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 font-body text-sm text-white/80 border-b border-forge-border pb-3"
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
                  >
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </span>
                  {f}
                </motion.li>
              ))}
            </ul>

            <button
              onClick={() => document.querySelector('#membership')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-body font-bold tracking-widest uppercase px-8 py-4 rounded-lg text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(230,57,70,0.4)]"
              style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
            >
              Explore Memberships
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
