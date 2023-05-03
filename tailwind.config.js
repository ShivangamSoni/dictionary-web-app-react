/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: {
          50: '#f4f4f4',
          100: '#e9e9e9',
          200: '#757575',
          300: '#3a3a3a',
          400: '#2d2d2d',
          500: '#1f1f1f',
          600: '#050505',
        },
        primary: {
          purple: '#a445ed',
          red: '#ff5252',
        },
      },
      fontFamily: {
        serif: "'Lora', serif",
        sansSerif: "'Inter', sans-serif",
        mono: "'Inconsolata', monospace",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
