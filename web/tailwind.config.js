const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },

      backgroundImage: {
        "hero-pattern": "url('/bg.png')",
      },

      colors: {
        gray: {
          300: '#8D8D99',
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
        yellow: {
          500: '#F7DD43',
        },
        green: {
          500: '#129E57',
        }
      }
    },
  },
  plugins: [],
}