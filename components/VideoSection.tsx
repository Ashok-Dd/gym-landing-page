'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Play, Dumbbell, Users, Zap } from 'lucide-react';

const FEATURES = [
  {
    Icon: Dumbbell,
    title: '15,000 sq ft Floor',
    desc: 'Olympic platforms, cable systems, and free-weight zones across two levels.',
  },
  {
    Icon: Zap,
    title: 'Elite Equipment',
    desc: 'Life Fitness & Technogym machines. Everything calibrated daily by our tech team.',
  },
  {
    Icon: Users,
    title: 'The Community',
    desc: '5,000+ members who push, motivate, and hold each other accountable every day.',
  },
];

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="video" className="py-28 bg-black overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Watch the Experience
          </p>
          <h2
            className="font-heading text-white leading-none"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
          >
            THE AEVUM
            <br />
            <span className="text-forge-red">EXPERIENCE</span>
          </h2>
          <p className="font-body text-forge-muted text-sm mt-4 max-w-md mx-auto leading-relaxed">
            A look inside the gym forging champions, told through the people who train here.
          </p>
        </motion.div>

        {/* Cinema frame */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-[1px] rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(230,57,70,0.4), rgba(244,162,97,0.2), rgba(30,30,30,0.5))',
            }}
          />
          {/* Extra spread glow */}
          <div
            className="absolute -inset-6 rounded-3xl pointer-events-none blur-2xl opacity-25"
            style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
          />

          {/* Browser chrome bar */}
          <div
            className="relative z-10 rounded-t-2xl px-4 py-2.5 flex items-center gap-2.5 border-b border-white/[0.06]"
            style={{ background: '#111' }}
          >
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div
              className="flex-1 mx-3 rounded-full px-3 py-1 text-center"
              style={{ background: '#1a1a1a', maxWidth: '340px', margin: '0 auto 0 12px' }}
            >
              <span className="font-body text-forge-muted/40 text-[10px] tracking-wider">
                aevumgym.com
              </span>
            </div>
          </div>

          {/* Video area */}
          <div
            className="relative overflow-hidden rounded-b-2xl"
            style={{ aspectRatio: '16 / 9', background: '#000' }}
          >
            {!playing ? (
              <>
                {/* <Image
                  src="/images/video-poster.svg"
                  alt="AEVUM gym tour video"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/50" /> */}

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setPlaying(true)}
                    className="relative w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
                    aria-label="Play AEVUM gym tour"
                  >
                    <Play size={26} className="text-white ml-1" fill="white" strokeWidth={0} />
                    {/* Ripple 1 */}
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-25"
                      style={{ background: 'rgba(230,57,70,0.6)' }}
                    />
                    {/* Ripple 2 */}
                    <span
                      className="absolute -inset-5 rounded-full border border-forge-red/20 animate-pulse"
                    />
                  </motion.button>

                  <p className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">
                    Play Gym Tour
                  </p>
                </div>

                {/* Bottom overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-heading text-white text-xl leading-none">
                    AEVUM Premium Gym · Full Facility Tour
                  </p>

                </div>
              </>
            ) : (
              /* Local gym tour video */
              <video
                autoPlay
                controls
                className="w-full h-full"
                style={{ background: '#000' }}
              >
                <source src="/videos/gym-tour.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </motion.div>

        {/* Feature pills */}
        <div className="grid sm:grid-cols-3 gap-5 mt-10">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-forge-border bg-forge-card group hover:border-forge-red/30 transition-colors duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)' }}
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
      </div>
    </section>
  );
}
