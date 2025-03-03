/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-color': '#8aca7a;',
      }
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ['dim', 'dracula'],
  }
}

