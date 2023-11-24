/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      keyframes: {
        scrolldown : {
          '0%' : {height: '0'},
          '100%': {height: 'auto'}
        }
      },
      animation: {
        scrolldown: 'scrolldown 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}

