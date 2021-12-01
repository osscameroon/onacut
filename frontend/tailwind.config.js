module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/src/assets/img/bg.jpg')"
      },
      colors: {
        'ind': '#ff4f00',
        'blue': 'blue'
      },
      width: {
        '700': '700px'
      },
      height: {
        '800': '800px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
