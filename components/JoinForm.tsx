'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle, Zap } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  goal: string;
  plan: string;
}

const INFO = [
  { Icon: MapPin,  label: 'Location', value: '123 Fitness Boulevard, Muscle City, MC 10001' },
  { Icon: Phone,   label: 'Phone',    value: '+1 (555) 987-6543' },
  { Icon: Mail,    label: 'Email',    value: 'hello@aevumgym.com' },
  { Icon: Clock,   label: 'Hours',    value: 'Mon–Fri: 5AM–11PM  ·  Sat–Sun: 6AM–10PM' },
];

export default function JoinForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', goal: '', plan: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())  e.name  = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.goal)         e.goal  = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', goal: '', plan: '' });
      setErrors({});
    }, 1400);
  };

  return (
    <section id="contact" className="py-28 bg-forge-dark" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-forge-red font-bold tracking-[0.3em] text-sm uppercase mb-3">
              Start Today
            </p>
            <h2 className="font-heading text-white leading-none mb-8"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
              Join the{' '}
              <span className="text-forge-red">AEVUM</span> Family
            </h2>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-900/20 border border-emerald-600/40 rounded-2xl p-10 text-center"
                >
                  <div className="flex justify-center mb-5">
                    <CheckCircle size={56} className="text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-3xl text-white mb-2">Welcome to AEVUM!</h3>
                  <p className="font-body text-white/70 text-sm leading-relaxed">
                    Your free trial is confirmed. We&apos;ll reach out within 24 hours to get you started.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className={shake ? 'shake' : ''}
                >
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="input-float-group">
                        <input id="fname" type="text" placeholder=" " value={form.name} onChange={set('name')} />
                        <label htmlFor="fname">Full Name *</label>
                      </div>
                      {errors.name && <p className="text-forge-red text-xs mt-1 font-body">{errors.name}</p>}
                    </div>
                    <div>
                      <div className="input-float-group">
                        <input id="femail" type="email" placeholder=" " value={form.email} onChange={set('email')} />
                        <label htmlFor="femail">Email Address *</label>
                      </div>
                      {errors.email && <p className="text-forge-red text-xs mt-1 font-body">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-float-group">
                      <input id="fphone" type="tel" placeholder=" " value={form.phone} onChange={set('phone')} />
                      <label htmlFor="fphone">Phone Number</label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-float-group">
                      <select id="fgoal" value={form.goal} onChange={set('goal')} required>
                        <option value="" disabled> </option>
                        <option>Build Muscle</option>
                        <option>Lose Weight</option>
                        <option>Improve Fitness</option>
                        <option>Athletic Performance</option>
                        <option>Stress Relief &amp; Wellness</option>
                      </select>
                      <label htmlFor="fgoal">Primary Goal *</label>
                    </div>
                    {errors.goal && <p className="text-forge-red text-xs mt-1 font-body">{errors.goal}</p>}
                  </div>

                  <div className="mb-8">
                    <div className="input-float-group">
                      <select id="fplan" value={form.plan} onChange={set('plan')}>
                        <option value=""> </option>
                        <option>Basic — $49/mo</option>
                        <option>Pro — $89/mo</option>
                        <option>Elite — $149/mo</option>
                      </select>
                      <label htmlFor="fplan">Interested Plan (optional)</label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-5 rounded-xl font-body font-bold tracking-wider text-white text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(230,57,70,0.5)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg,#e63946,#f4a261)' }}
                  >
                    <Zap size={18} strokeWidth={2} />
                    {submitting ? 'Sending...' : 'Claim Your Free 7-Day Trial'}
                  </button>
                  <p className="font-body text-forge-muted text-xs text-center mt-3">
                    No credit card required. Cancel anytime.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="bg-forge-card border border-forge-border rounded-2xl p-8 mb-8">
              {INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="flex items-start gap-4 py-5 border-b border-forge-border last:border-0 last:pb-0 first:pt-0"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)' }}
                  >
                    <item.Icon size={16} className="text-forge-red" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-body font-bold text-white text-sm mb-0.5">{item.label}</p>
                    <p className="font-body text-forge-muted text-sm leading-relaxed">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-2.5 flex-wrap">
              {[
                { name: 'Instagram', svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5"/></svg> },
                { name: 'Facebook',  svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { name: 'YouTube',   svg: <svg viewBox="0 0 24 24" width="18" height="16" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
                { name: 'X',        svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { name: 'TikTok',   svg: <svg viewBox="0 0 24 24" width="14" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 1 0 4.58 6.09V8.87a8.27 8.27 0 0 0 4.84 1.55V7a4.85 4.85 0 0 1-1.07-.31z"/></svg> },
              ].map(({ name, svg }) => (
                <button
                  key={name}
                  aria-label={name}
                  className="w-10 h-10 rounded-xl bg-forge-card border border-forge-border flex items-center justify-center text-forge-muted hover:border-forge-red hover:text-forge-red transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                >
                  {svg}
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
