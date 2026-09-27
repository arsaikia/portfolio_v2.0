/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in-bottom': 'slideInBottom 0.7s ease-out',
        'odo-in': 'odoIn 620ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'odo-out': 'odoOut 620ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'ink-bloom': 'inkBloom 1100ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(2rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        odoIn: {
          '0%': { transform: 'translateY(105%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        odoOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-105%)', opacity: '0' },
        },
        inkBloom: {
          '0%': { transform: 'scale(0.55)', opacity: '0', filter: 'blur(14px)' },
          '35%': { opacity: '0.34' },
          '100%': { transform: 'scale(1.45)', opacity: '0', filter: 'blur(26px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 