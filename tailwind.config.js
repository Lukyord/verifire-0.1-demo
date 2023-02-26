/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      poppin: ["Poppins", "sans-serif"],
      helvetica: ["Helvetica", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
