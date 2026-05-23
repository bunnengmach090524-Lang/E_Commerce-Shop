/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    '#0d1117',
          nav:     '#131921',
          subnav:  '#232f3e',
          yellow:  '#ffd814',
          orange:  '#f90',
          hover:   '#f0c62e',
          link:    '#007185',
          red:     '#c45500',
        }
      },
      fontFamily: {
        sans: ['"Amazon Ember"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease',
        'slide-right':'slideRight 0.35s cubic-bezier(0.22,1,0.36,1)',
        'scale-up':   'scaleUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        'bounce-in':  'bounceIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        'toast-in':   'toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      },
      keyframes: {
        fadeIn:     { from: { opacity: 0 }, to: { opacity: 1 } },
        slideRight: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        scaleUp:    { from: { opacity: 0, transform: 'scale(0.85) translateY(20px)' }, to: { opacity: 1, transform: 'scale(1) translateY(0)' } },
        bounceIn:   { from: { transform: 'scale(0)', opacity: 0 }, to: { transform: 'scale(1)', opacity: 1 } },
        toastIn:    { from: { opacity: 0, transform: 'translateX(100%) scale(0.9)' }, to: { opacity: 1, transform: 'translateX(0) scale(1)' } },
      }
    }
  },
  plugins: []
}