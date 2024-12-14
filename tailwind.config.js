/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#4670B7", // True Blue
          secondary: "#E2C849", // Arylide Yellow
          accent: "#F08EA0", // Salmon Pink
          error: "#AD0102", // Turkey Red
          // "base-100": "#ECF3FB", // Alice Blue
        },
      },
    ],
  },
};
