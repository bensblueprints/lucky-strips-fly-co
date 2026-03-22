import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Heritage Gold - Primary Brand Color
        gold: {
          50: '#FDF8ED',
          100: '#F9EDCE',
          200: '#F3D99C',
          300: '#E8BE5F',
          400: '#D4A22E',
          500: '#BA8818', // Primary brand gold
          600: '#9A6C12',
          700: '#7A5210',
          800: '#5C3D0D',
          900: '#3E2D08',
          950: '#2C1810',
        },
        // Earth Browns - Grounding tones
        earth: {
          50: '#FAF7F5',
          100: '#F5F0E8', // Warm cream background
          200: '#E8DFD3',
          300: '#D4C4B0',
          400: '#B59D7E',
          500: '#8B7355',
          600: '#6B5642',
          700: '#4D3D2E',
          800: '#2C1810', // Deep earth
          900: '#1A0F0A',
          950: '#0D0705',
        },
        // Forest Greens - Nature accent
        forest: {
          50: '#F0F5F3',
          100: '#D9E8E2',
          200: '#B5D1C6',
          300: '#86B3A3',
          400: '#5A8F7D',
          500: '#3D6B5A',
          600: '#2F5446',
          700: '#1E3A2F', // Deep pine
          800: '#152920',
          900: '#0D1A14',
          950: '#060D0A',
        },
        // River Blues - Water tones
        river: {
          50: '#F2F6F8',
          100: '#E1EAF0',
          200: '#C4D5E0',
          300: '#9BB8CA',
          400: '#6B94AD',
          500: '#4A7590',
          600: '#3A5D75',
          700: '#2D4A5E', // Slate river blue
          800: '#263C4C',
          900: '#1A2830',
          950: '#0D1418',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(44, 24, 16, 0.85) 0%, rgba(30, 58, 47, 0.75) 50%, rgba(45, 74, 94, 0.65) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(44, 24, 16, 0.07), 0 10px 20px -2px rgba(44, 24, 16, 0.04)',
        'elevated': '0 25px 50px -12px rgba(44, 24, 16, 0.15)',
        'gold': '0 4px 14px 0 rgba(186, 136, 24, 0.3)',
        'inner-gold': 'inset 0 2px 4px 0 rgba(186, 136, 24, 0.06)',
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
      },
    },
  },
  plugins: [],
};
export default config;
