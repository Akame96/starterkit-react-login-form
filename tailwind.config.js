// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Aggiungi le estensioni usate nel progetto
  ],
  theme: {
    extend: {},
  },
  plugins: [
    '@tailwindcss/forms',
  ],
};


