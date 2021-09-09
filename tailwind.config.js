// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors')

module.exports = {
  prefix: 'tw-',
  important: true,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        orange: colors.orange,
        rose: colors.rose,
        sky: colors.sky,
        violet: colors.violet,
        emerald: colors.emerald,
        'true-gray': colors.trueGray,
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        small: ['10px'],
        'semi-small': ['11px'],
        'very-small': ['8px'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
