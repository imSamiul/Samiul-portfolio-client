/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Montserrat: ["Montserrat", "serif"],
    },
  },
  plugins: [require("daisyui")],
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
