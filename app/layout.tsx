import type { Metadata } from 'next';
import { Bebas_Neue, Montserrat } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'AEVUM | Premium Gym — Eternal Strength.',
  description:
    'AEVUM is an elite gym for men and women. Expert certified trainers, 24/7 access, state-of-the-art equipment, personalised nutrition plans, and proven transformation programs. Join today.',
  keywords: [
    'gym', 'fitness center', 'personal training', 'weight loss',
    'muscle building', 'premium gym', 'elite fitness', 'yoga',
    'crossfit', 'HIIT', 'strength training', 'women gym', 'men gym',
  ],
  openGraph: {
    title: 'AEVUM | Premium Gym — Eternal Strength.',
    description: 'Elite gym for men and women. Expert trainers, 24/7 access, proven transformations.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'AEVUM Premium Gym',
      },
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'AEVUM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEVUM | Premium Gym',
    description: 'Elite gym. Eternal strength.',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  name: 'AEVUM Premium Gym',
  description: 'Elite gym for men and women. Expert trainers, 24/7 access, proven transformations.',
  url: 'https://aevumgym.com',
  telephone: '+15559876543',
  email: 'hello@aevumgym.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Fitness Boulevard',
    addressLocality: 'Muscle City',
    postalCode: '10001',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '05:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday'], opens: '06:00', closes: '22:00' },
  ],
  priceRange: '$$',
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '1240' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${montserrat.variable}`}>
      <head>
        <link rel="preload" href="/videos/hero.mp4" as="video" type="video/mp4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
