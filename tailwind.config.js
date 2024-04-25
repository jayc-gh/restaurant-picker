/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './client/pages/**/*.{html,js}',
    './client/index.js',
    './client/index.html',
  ],
  theme: {
    colors: {
      lightpink: '#eaddd7',
      middlepink: '#ffdada',
      darkpink: '#ffc9c9',
      pastelbeige: '#ffefd5',
      darkerpastelbeige: '#ffe8c2',
      offwhite: '#FFFFF4',
    },
    extend: {
      fontFamily: {
        nunito: ['Nunito'],
      },
    },
  },
  plugins: [],
};
