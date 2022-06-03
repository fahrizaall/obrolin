module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'opensans': ['Open Sans', 'sans-serif'] ,
        'worksans': ['Work Sans', 'sans-serif'], 
        'montserrat': ['Montserrat', 'sans-serif'] 
      },
    },
  },
  plugins: [],
}