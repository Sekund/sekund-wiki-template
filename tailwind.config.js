/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        display: ['Philosopher'],
        serif: ['Philosopher'],
        sans: ['Mulish'],
        body: ['Mulish'],
      },
      colors: {
        primary: {
          100: '#eaa3a7',
          200: '#eaa3a7',
          300: '#e48991',
          400: '#e48991',
          500: '#dc707c',
          600: '#dc707c',
          700: '#d55268',
          800: '#d55268',
          900: '#d55268',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
      },
      lineHeight: {
        hero: '4.5rem',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
