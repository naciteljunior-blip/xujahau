/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefdf4',
          100: '#d6fae3',
          200: '#b0f3cc',
          300: '#7ce7ad',
          400: '#45d488',
          500: '#1fba6c',
          600: '#149656',
          700: '#137748',
          800: '#135e3c',
          900: '#114d33',
          950: '#052b1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
