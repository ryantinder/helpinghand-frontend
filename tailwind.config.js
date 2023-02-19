/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        animation: {
          fadeIn: "fadeIn 2s ease-in forwards",
          float: 'float 12s infinite linear',
          'float-slow': 'float 12s infinite linear',
          'float-fast': 'float 8s infinite linear',
          'float-fastest': 'float 6s infinite linear',
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 }
          },
          float: {
            '0%': {
              transform: ' rotate(-0.001deg) translate3d(15px, 0, 0) rotate(-0.001deg)',
            },
            '100%': {
              transform: 'rotate(360.001deg) translate3d(15px, 0, 0) rotate(-360.001deg)',
            },
          },
        },
      },
    },
  }

