/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_primary: "#000000",
        bg_secondary: "#121212",
        primary_1: "#D300C5",
        primary_2: "#FFC800",
        text_color: "#F5F5F5",
      },

      spacing: {
        default: "1rem",
      },

      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "1000px",
        },
      },
    },
  },
  plugins: [],
};
