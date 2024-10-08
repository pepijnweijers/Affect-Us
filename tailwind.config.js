/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                fadeHighlight: 'fadeHighlight 1.5s ease forwards',
            },
            keyframes: {
                fadeHighlight: {
                    '0%': { opacity: '0' },
                    '50%': { opacity: '1' },
                    '100%': { opacity: '0.2' },
                }
            }
        },
        colors: {
            "neutral": {
                50: '#fff',
                100: '#F7F7F7',
                200: '#E8E8E8',
                300: '#CDCCCB',
                400: '#ABABAB',
                500: '#8F8F8F',
                600: '#71706F',
                700: '#4A4847',
                800: '#2C2B2A',
                900: '#191716'
            }
        }
    },
    plugins: [],
};