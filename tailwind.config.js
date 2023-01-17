const { fontFamily } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', ...fontFamily.sans],
        staatliches: ['var(--font-staatliches)', ...fontFamily.sans],
        megrim: ['var(--font-megrim)', ...fontFamily.sans]
      },
      colors:{
        'primary': '#03032C',
        'secondary': '#360857',
        'terciary': '#3A385B',
        'yellow': '#DAA520',
        'blue': '#0096FF',
        'red': '#DA204D',
        'purple': '#360857'
      },
    },
    screens: {
      "lsm": "450px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}