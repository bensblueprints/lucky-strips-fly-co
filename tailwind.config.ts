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
        primary: {
          50: '#f0f9f4',
          100: '#dcf0e4',
          200: '#bbe1cc',
          300: '#8dcbab',
          400: '#5aad84',
          500: '#3a9169',
          600: '#2a7454',
          700: '#235d45',
          800: '#1f4a39',
          900: '#1b3d30',
          950: '#0d221b',
        },
        accent: {
          50: '#fdf8f3',
          100: '#f9ede0',
          200: '#f2d8bc',
          300: '#e9be90',
          400: '#de9d5f',
          500: '#d58542',
          600: '#c76e34',
          700: '#a6562c',
          800: '#85462a',
          900: '#6c3b25',
          950: '#3a1d12',
        },
        river: {
          50: '#f2f9fd',
          100: '#e4f1fa',
          200: '#c3e3f5',
          300: '#8eccec',
          400: '#51b0e0',
          500: '#2a96cd',
          600: '#1b78ae',
          700: '#18608d',
          800: '#185175',
          900: '#194462',
          950: '#112c41',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
