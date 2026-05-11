/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef9ff',
          100: '#d9f1ff',
          200: '#bce8ff',
          300: '#8ed9ff',
          400: '#59c1fd',
          500: '#33a4f9',
          600: '#1d86ee',
          700: '#156fdb',
          800: '#175ab1',
          900: '#194d8b',
          950: '#132f57',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
      },
      fontFamily: {
        sans: ['Heebo', 'Rubik', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        'slide-out-right': 'slideOutRight 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.45s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shake':      'shake 0.4s ease-in-out',
      },
      keyframes: {
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        slideOutRight: {
          from: { transform: 'translateX(0)',    opacity: '1' },
          to:   { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(24px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to:   { transform: 'scale(1)',    opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-8px)' },
          '40%':      { transform: 'translateX(8px)' },
          '60%':      { transform: 'translateX(-5px)' },
          '80%':      { transform: 'translateX(5px)' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #175ab1 0%, #0d9488 100%)',
        'gradient-hero':  'linear-gradient(160deg, #132f57 0%, #175ab1 50%, #0d9488 100%)',
      },
    },
  },
  plugins: [],
}
