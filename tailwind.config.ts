import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          red: '#e63946',
          gold: '#f4a261',
          dark: '#050505',
          card: '#111111',
          'card-alt': '#1a1a1a',
          muted: '#999999',
          border: '#222222',
        },
      },
      fontFamily: {
        heading: ['var(--font-bebas)', 'cursive'],
        body: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'forge-gradient': 'linear-gradient(135deg, #e63946, #f4a261)',
      },
    },
  },
  plugins: [],
};

export default config;
