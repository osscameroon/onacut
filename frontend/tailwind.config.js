module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/src/assets/img/bg.jpg')"
      },
      colors: {
        'ind': '#ff4f00'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
