/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'greenMain': '#166534',
        'brownMain': '#653416',
        'indigoMain': '#341665',
        'greenMainLight': '#229D51',
        'brownMainLight': '#9D5122',
        'indigoMainLight': '#51229D',
      },
    },
  },
  plugins: [],
}

