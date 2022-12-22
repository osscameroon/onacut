module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {

            colors: {
                'ind': '#ff4f00',
                'blue': 'blue',
                'blueDark': '#00182B',
                'blueDark-500': '#4cb7b9'
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
