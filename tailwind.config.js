/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Enables dark mode using class strategy
  content: ['./index.html', './src/**/*.{js,jsx}'], // ✅ Scans your files for Tailwind classes
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#9333EA',
      },
    },
  },
  plugins: [],
};
