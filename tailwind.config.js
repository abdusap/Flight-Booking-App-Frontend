/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-grey': 'rgb(233, 241, 252);',
        'custom-bggrey': 'rgb(225, 231, 238);',
      },
      textColor: {
        'custom-blue': 'rgb(54, 116, 224);',
      }
    },
  },
  plugins: [],
}

