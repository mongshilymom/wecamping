/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf8f0',
          100: '#f6f1e1',
          500: '#8B7355',
          600: '#6B5B47',
          700: '#4A3F33',
          800: '#363636',
          900: '#2C2C2C',
        },
        pension: {
          primary: '#8B7355',
          secondary: '#fbf8f0',
          accent: '#6B5B47',
        },
        camping: {
          primary: '#2D5016',
          secondary: '#E8F5E8',
          accent: '#4A7C59',
        },
        cafe: {
          primary: '#8B4513',
          secondary: '#FFF8DC',
          accent: '#CD853F',
        }
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}