import defaultTheme from 'tailwindcss/defaultTheme';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        audiowide: ['Audiowide', 'sans-serif'],
      },
      colors: {
        primary: "#00CFFF",
        secondary: "#FF3C38",
        accent: "#FFD700",
        "neon-purple": "#9B59B6",
      },
    },
  },
  plugins: [],
} 