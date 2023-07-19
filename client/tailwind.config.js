/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#9a3412'
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
    

      'xl': {'max': '1279px'},
     

      'lg': {'max': '1023px'},

     
      'sm': {'max': '750px'},
    
    }
  },
  plugins: [],
}
