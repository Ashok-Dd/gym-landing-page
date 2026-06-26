'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { User } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    since: 'Member since 2022',
    rating: 5,
    text: '"Lost 35 lbs in just 4 months. The trainers here genuinely invest in your success — this isn\'t just a gym, it\'s a life-changing experience."',
  },
  {
    name: 'Marcus Johnson',
    since: 'Member since 2021',
    rating: 5,
    text: '"Gained 20 lbs of lean muscle in 5 months. Mike Torres is the best strength coach I\'ve ever worked with. The programming is elite-level."',
  },
  {
    name: 'Priya Kapoor',
    since: 'Member since 2023',
    rating: 5,
    text: '"As a woman, I was nervous about the gym. AEVUM\'s women\'s zone and Sofia\'s yoga classes gave me a safe space to absolutely transform."',
  },
  {
    name: 'David Laurent',
    since: 'Member since 2020',
    rating: 5,
    text: '"I\'ve been a member for 4 years. The equipment is always in perfect condition, the staff is world-class, and the community keeps me coming back."',
  },
  {
    name: 'Lisa Romano',
    since: 'Member since 2022',
    rating: 5,
    text: '"The Elite plan is worth every penny. Unlimited PT sessions with Priya Sharma completely changed my body composition. Zero regrets."',
  },
  {
    name: 'Tom Whitfield',
    since: 'Member since 2023',
    rating: 5,
    text: '"Came in overweight and out of shape. 6 months later I ran a half-marathon and deadlifted twice my bodyweight. The results speak for themselves."',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="py-28 bg-forge-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Member Stories
          </p>
          <h2 className="font-heading text-white leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            What Our <span className="text-forge-red">Members</span> Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="bg-forge-dark border border-forge-border rounded-2xl p-8 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-forge-gold text-base">★</span>
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="font-body text-white/75 text-sm leading-relaxed italic flex-1 mb-6">
                    {t.text}
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-4 border-t border-forge-border pt-5">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-forge-red"
                      style={{ background: 'rgba(230,57,70,0.1)' }}
                    >
                      <User size={22} className="text-forge-red" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-body font-bold text-white text-sm">{t.name}</p>
                      <p className="font-body text-forge-muted text-xs">{t.since}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
