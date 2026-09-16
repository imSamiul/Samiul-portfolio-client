/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");
const themes = require("daisyui/src/theming/themes.js");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Montserrat: ["Montserrat", "serif"],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...themes["light"],
          primary: "#4670B7", // True Blue
          secondary: "#E2C849", // Arylide Yellow
          accent: "#F08EA0", // Salmon Pink
          error: "#AD0102", // Turkey Red
        },
      },

      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "forest",
      "fantasy",
      "wireframe",
      "dracula",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "sunset",
    ],
  },
};
