/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {},
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

