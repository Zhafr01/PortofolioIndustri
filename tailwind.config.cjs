/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
      colors: {
        teal: {
          DEFAULT: '#0D9488',
          light: '#CCFBF1',
          dark: '#0F766E',
        }
      },
      spacing: {
        'gap': '24px',
      }
    },
  },
  plugins: [],
}
