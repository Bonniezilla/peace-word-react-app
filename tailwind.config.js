const plugin = require('tailwindcss/plugin');
const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'text-entry': 'text-entry 1s ease-in-out',
        'text-entry-invert': 'text-entry-invert 1s ease-in-out',
        'appear': 'appear 1s ease-in-out',
        'spin-one': 'spin 0.5s ease-in-out'
      },
      keyframes: {
        'text-entry': {
          '0%': { transform: 'translateX(-1em)', opacity: '0%' },
          '100%': { transform: 'translateX(0)', opacity: '100%' }
        },
        'text-entry-invert': {
          '0%': { transform: 'translateX(1em)', opacity: '0%' },
          '100%': { transform: 'translateX(0)', opacity: '100%' }
        },
        'appear': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
      gridTemplateColumns: {
        'auto-fit-450': 'repeat(auto-fit, minmax(450px, 1fr))'
      },
    },
  }, 
  plugins: [
    require('autoprefixer'),
    plugin(function ( { addVariant }) {
      addVariant('slider-thumb', ['&::-webkit-slider-thumb', '&::slider-thumb', '&::-moz-range-thumb'])
    }),
  ],
}
