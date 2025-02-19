/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["M PLUS Rounded 1c", "sans-serif"],
        display: ["DM Sans", "sans-serif"],
      },
      colors: {
        'pink': '#f304ec',
        'mint': '#339995',
      },
    },
  },
  plugins: [],
};
