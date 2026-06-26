'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const links = [
  { href: '#about',      label: 'About'      },
  { href: '#programs',   label: 'Programs'   },
  { href: '#app',        label: 'App'        },
  { href: '#trainers',   label: 'Trainers'   },
  { href: '#membership', label: 'Membership' },
  { href: '#contact',    label: 'Contact'    },
];

// Variants — used for the overlay + stagger children
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, when: 'beforeChildren', staggerChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, when: 'afterChildren', staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 22 },
  visible:  { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.4 } },
  exit:     { opacity: 0, y: 16, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLink = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[rgba(5,5,5,0.92)] backdrop-blur-xl border-b border-white/[0.04] shadow-[0_2px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-heading text-[1.7rem] tracking-wider select-none leading-none z-10"
          >
            <span className="text-white">AE</span>
            <span className="text-forge-red">V</span>
            <span className="text-white">UM</span>
          </button>

          {/* Desktop nav links — fade in after scroll */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <motion.button
                key={l.href}
                onClick={() => handleLink(l.href)}
                animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -4 }}
                transition={{ duration: 0.4 }}
                className="relative font-body text-[11px] font-semibold text-forge-muted hover:text-white tracking-[0.18em] uppercase transition-colors duration-200 group"
              >
                {l.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg,#e63946,#f4a261)' }}
                />
              </motion.button>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={() => handleLink('#contact')}
            className="hidden md:flex font-body font-bold text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 rounded-full text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(230,57,70,0.5)]"
            style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
          >
            Join Now
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 relative z-[60]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-white origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block w-5 h-[1.5px] bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-white origin-center"
            />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-7"
            style={{ backgroundColor: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(18px)' }}
          >
            {/* Subtle background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(230,57,70,0.06), transparent)',
              }}
            />

            {/* Nav links */}
            {links.map((l) => (
              <motion.button
                key={l.href}
                variants={itemVariants}
                onClick={() => handleLink(l.href)}
                className="font-heading text-5xl text-white hover:text-forge-red transition-colors tracking-wider relative z-10"
              >
                {l.label}
              </motion.button>
            ))}

            {/* CTA */}
            <motion.button
              variants={itemVariants}
              onClick={() => handleLink('#contact')}
              className="mt-2 font-body font-bold tracking-[0.15em] uppercase px-10 py-4 rounded-full text-white relative z-10"
              style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
            >
              Join Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
