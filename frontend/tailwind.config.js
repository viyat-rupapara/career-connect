/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2A9D8F',
          light: '#4FB3A7',
          dark: '#218880',
        },
        secondary: {
          DEFAULT: '#264653',
          light: '#395A68',
          dark: '#1A323C',
        },
        accent: {
          DEFAULT: '#E9C46A',
          light: '#F0D48A',
          dark: '#D9B146',
        },
        danger: {
          DEFAULT: '#E76F51',
          light: '#EB8B72',
          dark: '#D45A3C',
        },
        success: '#52B788',
        info: '#457B9D',
        warning: '#F9A826',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
