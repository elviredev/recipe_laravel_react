/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/**/*.{blade.php,js,ts,jsx,tsx}', './index.html'],
    theme: {
        extend: {},
    },
    plugins: [],
    experimental: {
        optimizeUniversalDefaults: false
    }
};
