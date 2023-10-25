/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'sky-light': '#859ad9',
        'sky': '#436deb',
        'dark': '#17202a',
        'txt-grey': '#94a3b8'
      }
    },
  },
  plugins: [],
};
