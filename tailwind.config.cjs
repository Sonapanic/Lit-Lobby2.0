module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Include React files
  ],
  theme: {
    extend: {
      colors: {
        softWhite: '#f3f3f3',
        lightWhite: '#fdfdfd',
        softBlack: '#333333',
        warmBrown: '#4B402E',
        darkBrown: '#2d261b',
        viaBrown: '#342c20',
        lightGrey: '#d6d6d6',
        alternateBrown: '#74644b',
        testShadow: '#698D5F',
        midBrown: '#3c3324'
      } ,
      fontFamily: {
        book: ['Gentium Book Plus', 'serif'],
        source: ['Source Serif 4', 'serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  }
  // other Tailwind CSS configurations...
}
