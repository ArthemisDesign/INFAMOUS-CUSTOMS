import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"TT Runs Trial"', ...defaultTheme.fontFamily.sans],
      },
      cursor: {
        'custom': `url('/cursor.svg'), auto`,
      },
    },
  },
  plugins: [],
};
