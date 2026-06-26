'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'About Us',   href: '#about'      },
  { label: 'Programs',   href: '#programs'   },
  { label: 'Mobile App', href: '#app'        },
  { label: 'Trainers',   href: '#trainers'   },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact',    href: '#contact'    },
];

const PROGRAM_LINKS = [
  { label: 'Strength Training', href: '#programs' },
  { label: 'HIIT & Cardio',     href: '#programs' },
  { label: 'Yoga & Pilates',    href: '#programs' },
  { label: 'CrossFit',          href: '#programs' },
  { label: 'BMI Calculator',    href: '#bmi'      },
];

const CONTACT_ITEMS = [
  { Icon: MapPin, text: '123 Fitness Blvd, Muscle City' },
  { Icon: Phone,  text: '+1 (555) 987-6543' },
  { Icon: Mail,   text: 'hello@aevumgym.com' },
  { Icon: Clock,  text: '5AM–11PM Mon–Fri' },
];

const SOCIAL = [
  {
    name: 'Instagram',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="19" height="17" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="15" height="17" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 1 0 4.58 6.09V8.87a8.27 8.27 0 0 0 4.84 1.55V7a4.85 4.85 0 0 1-1.07-.31z"/>
      </svg>
    ),
  },
];

const scrollTo = (href: string) => {
  if (href === '#') return;
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-forge-border pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-forge-border">

          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-heading text-3xl tracking-wider mb-4 block"
            >
              <span className="text-white">AE</span>
              <span className="text-forge-red">V</span>
              <span className="text-white">UM</span>
            </button>
            <p className="font-body text-forge-muted text-sm leading-relaxed mb-6">
              Transforming lives through elite fitness since 2014. Your strength is our mission.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              {SOCIAL.map(({ name, href, svg }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-xl bg-forge-card border border-forge-border flex items-center justify-center text-forge-muted hover:border-forge-red hover:text-forge-red transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-bold text-white text-xs tracking-[0.2em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="font-body text-forge-muted text-sm hover:text-forge-red transition-colors duration-200 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-body font-bold text-white text-xs tracking-[0.2em] uppercase mb-5">
              Programs
            </h4>
            <ul className="space-y-3">
              {PROGRAM_LINKS.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="font-body text-forge-muted text-sm hover:text-forge-red transition-colors duration-200 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-bold text-white text-xs tracking-[0.2em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              {CONTACT_ITEMS.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={13} className="text-forge-red mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                  <span className="font-body text-forge-muted text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-forge-muted font-body text-xs">
          <p>© {new Date().getFullYear()} AEVUM. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <button key={l} className="hover:text-forge-red transition-colors duration-200">
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#e63946,#f4a261)' }} />
    </footer>
  );
}
