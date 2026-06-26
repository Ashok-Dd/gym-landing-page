'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface Trainer {
  name: string;
  role: string;
  certs: string[];
  img: string;
}

const TRAINERS: Trainer[] = [
  {
    name: 'Mike Torres',
    role: 'Head of Strength & Conditioning',
    certs: ['NASM-CPT', 'CSCS'],
    img: '/images/trainers/trainer-1.webp',
  },
  {
    name: 'Sofia Reyes',
    role: 'Yoga & Pilates Director',
    certs: ['RYT-500', 'BASI Pilates'],
    img: '/images/trainers/trainer-2.webp',
  },
  {
    name: 'James Okafor',
    role: 'HIIT & Cardio Coach',
    certs: ['ACE-CPT', 'AFAA'],
    img: '/images/trainers/trainer-3.webp',
  },
  {
    name: 'Priya Sharma',
    role: "Women's Transformation Specialist",
    certs: ['NSCA-CPT', 'Precision Nutrition'],
    img: '/images/trainers/trainer-4.webp',
  },
  {
    name: 'Alex Chen',
    role: 'CrossFit & Nutrition Coach',
    certs: ['CF-L3', 'ISSN Sport Nutritionist'],
    img: '/images/trainers/trainer-5.webp',
  },
  {
    name: 'Emma Walsh',
    role: 'Transformation Coach',
    certs: ['NASM-CPT', 'PN1'],
    img: '/images/trainers/trainer-6.webp',
  },
];

function TrainerCard({ trainer, tall = false }: { trainer: Trainer; tall?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative group overflow-hidden rounded-2xl border border-forge-border"
      style={{ height: tall ? '440px' : '210px' }}
    >
      <Image
        src={trainer.img}
        alt={trainer.name}
        fill
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      {/* Permanent gradient bottom overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forge-dark via-forge-dark/20 to-transparent" />

      {/* Info always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-heading text-white text-2xl leading-tight">{trainer.name}</h3>
        <p className="font-body text-forge-muted text-xs mb-2 leading-snug">{trainer.role}</p>
        <div className="flex flex-wrap gap-1.5">
          {trainer.certs.map((c) => (
            <span
              key={c}
              className="text-[10px] font-body font-bold px-2 py-0.5 rounded text-white"
              style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Trainers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="trainers" className="py-28 bg-forge-dark" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Meet the Team
          </p>
          <h2 className="font-heading text-white leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            Coached by the <span className="text-forge-red">Best</span>
          </h2>
        </motion.div>

        {/* Editorial magazine grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="hidden lg:grid lg:grid-cols-5 gap-5 mb-5"
        >
          {/* Row 1: Large left + 2 small right */}
          <div className="col-span-3">
            <TrainerCard trainer={TRAINERS[0]} tall />
          </div>
          <div className="col-span-2 flex flex-col gap-5">
            <TrainerCard trainer={TRAINERS[1]} />
            <TrainerCard trainer={TRAINERS[2]} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="hidden lg:grid lg:grid-cols-5 gap-5"
        >
          {/* Row 2: 2 small left + large right */}
          <div className="col-span-2 flex flex-col gap-5">
            <TrainerCard trainer={TRAINERS[3]} />
            <TrainerCard trainer={TRAINERS[4]} />
          </div>
          <div className="col-span-3">
            <TrainerCard trainer={TRAINERS[5]} tall />
          </div>
        </motion.div>

        {/* Mobile: simple grid */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-5">
          {TRAINERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <TrainerCard trainer={t} tall />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
