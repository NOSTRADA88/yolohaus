/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['12px', '22px'],
      sm: ['14px', '20px'],
      base: ['16px', '22px'],
      lg: ['18px', '22px'],
      xl: ['20px', '24px'],
      '2xl': ['22px', '22px'],
      '3xl': ['32px', '22px'],
      '4xl': ['64px', '102px'],
    },
    extend: {
      fontFamily: {
        museo: ['MuseoSansCyrl', 'sans-serif'],
      },
      colors: {
        orange: '#EA9635',
        maingray: '#2B2A29',
        lightgray: '#727272',
        lightwhite:"#F4F4F4",
        contact: "#C4C4C4"
      }
    }
  },
  plugins: [],
}
