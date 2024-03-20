/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.css",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: "url('/src/assets/Login.svg')",

      colors: {
        'gray-bg': '#EEEEEE',
        'gray-text': '#657279',
        'gray-text2': '#576065' 
    
      },
      fontFamily: {
        sans: ['Oswald', 'sans-serif'],

      },
      
    },
  },
  plugins: [],

}

