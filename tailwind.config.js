const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        go: "#29BEB0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
