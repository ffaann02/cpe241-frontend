/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
    theme: {
        extend: {
            gridColumn: {
                'span-13': 'span 13 / span 13',
                'span-14': 'span 14 / span 14',
            },
            gridColumnStart: {
                13: '13',
                14: '14',
            },
            gridColumnEnd: {
                13: '13',
                14: '14',
            },
            gridTemplateColumns: {
                13: 'repeat(13, minmax(0, 1fr))',
                14: 'repeat(14, minmax(0, 1fr))',
            },
            colors: {
                'royal-blue': {
                    50: '#eef1ff',
                    100: '#e1e6fe',
                    200: '#c8d1fd',
                    300: '#a7b3fa',
                    400: '#848af5',
                    500: '#605dec',
                    600: '#594ae1',
                    700: '#4c3cc6',
                    800: '#3f33a0',
                    900: '#36307f',
                    950: '#211c4a',
                },
            },
            fontFamily: {
              'IBM-Plex': ["IBM Plex Sans Thai", "sans-serif"]
           }
        },
    },
};
