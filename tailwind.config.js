/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 4s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

