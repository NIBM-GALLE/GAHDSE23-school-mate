/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b306c",
        secondary: "#87819d",
        light: "#f2fbf8",
      },
    },
  },
  plugins: [],
}