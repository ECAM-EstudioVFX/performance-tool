/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "dark-900": "#111", // Puedes personalizar este valor
      },
      textColor: {
        "light-100": "#ddd", // Puedes personalizar este valor
      },
    },
  },
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  plugins: [nextui(), require("@tailwindcss/forms")],
};
