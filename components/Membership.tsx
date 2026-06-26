'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

type Billing = 'monthly' | 'annual';

interface Plan {
  name: string;
  monthly: number;
  features: string[];
  disabled: string[];
  featured: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Basic',
    monthly: 49,
    featured: false,
    features: ['Full gym floor access', 'Locker room & showers', '2 group classes / week', 'Fitness assessment'],
    disabled: ['Personal trainer sessions', 'Nutrition plan', 'Recovery zone'],
  },
  {
    name: 'Pro',
    monthly: 89,
    featured: true,
    features: ['Unlimited floor access', 'All group classes', '4 PT sessions / month', 'Custom nutrition plan', 'App progress tracking'],
    disabled: ['Recovery zone (sauna/cryo)'],
  },
  {
    name: 'Elite',
    monthly: 149,
    featured: false,
    features: [
      'Everything in Pro',
      'Unlimited PT sessions',
      'Full nutrition coaching',
      'Recovery zone unlimited',
      'Priority class booking',
      'Guest passes (2/mo)',
    ],
    disabled: [],
  },
];

export default function Membership() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const price = (p: Plan) =>
    billing === 'annual' ? Math.round(p.monthly * 0.8) : p.monthly;

  return (
    <section id="membership" className="py-28 bg-forge-dark" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
            Pricing Plans
          </p>
          <h2 className="font-heading text-white leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            Invest in Your <span className="text-forge-red">Best Self</span>
          </h2>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-14"
        >
          <span className={`font-body text-sm font-semibold ${billing === 'monthly' ? 'text-white' : 'text-forge-muted'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')}
            className="relative w-14 h-7 rounded-full bg-forge-card border border-forge-border transition-colors"
            style={billing === 'annual' ? { background: 'linear-gradient(135deg,#e63946,#f4a261)', borderColor: 'transparent' } : {}}
          >
            <motion.span
              animate={{ x: billing === 'annual' ? 28 : 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow block"
            />
          </button>
          <span className={`font-body text-sm font-semibold ${billing === 'annual' ? 'text-white' : 'text-forge-muted'}`}>
            Annual{' '}
            <span className="text-forge-red text-xs font-bold ml-1">SAVE 20%</span>
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={!plan.featured ? { y: -8, borderColor: '#e63946', boxShadow: '0 24px 50px rgba(230,57,70,0.2)' } : {}}
              className={`relative rounded-2xl p-8 transition-colors duration-300 ${
                plan.featured
                  ? 'border-2 border-forge-red md:scale-[1.04] shadow-[0_0_60px_rgba(230,57,70,0.25)]'
                  : 'border border-forge-border bg-forge-card'
              }`}
              style={plan.featured ? { background: 'linear-gradient(160deg, #180a0b, #1a1010)' } : {}}
            >
              {plan.featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full font-body font-bold text-xs tracking-[0.15em] uppercase text-white whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
                >
                  Most Popular
                </div>
              )}

              <p className="font-heading text-forge-muted text-xl mb-2">{plan.name}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={billing}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-end gap-1 mb-6"
                >
                  <span className="font-body text-forge-muted text-lg self-start mt-3">$</span>
                  <span className="font-heading text-white leading-none"
                        style={{ fontSize: 'clamp(3rem, 6vw, 4rem)' }}>
                    {price(plan)}
                  </span>
                  <span className="font-body text-forge-muted text-sm mb-2">/mo</span>
                </motion.div>
              </AnimatePresence>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm text-white/80">
                    <span className="text-xs text-white w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
                {plan.disabled.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm text-forge-border line-through">
                    <span className="text-xs text-forge-border w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border border-forge-border">
                      ✕
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-4 rounded-xl font-body font-bold tracking-wider text-sm transition-all duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? 'text-white hover:shadow-[0_10px_30px_rgba(230,57,70,0.5)]'
                    : 'border-2 border-white/20 text-white hover:border-forge-red hover:text-forge-red'
                }`}
                style={plan.featured ? { background: 'linear-gradient(135deg,#e63946,#f4a261)' } : {}}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
