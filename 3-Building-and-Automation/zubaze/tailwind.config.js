/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2953E8",
        "background-light": "#F4F4F4",
        "background-dark": "#1A202C",
        "card-light": "#FFFFFF",
        "card-dark": "#2D3748",
        "text-light": "#000000",
        "text-dark": "#FFFFFF",
        "text-secondary-light": "#656565",
        "text-secondary-dark": "#A0AEC0",
        "border-light": "#EEEEEE",
        "border-dark": "#4A5568",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        logo: ["Fredoka One", "cursive"],
      },
      borderRadius: {
        DEFAULT: "20px",
      },
    },
  },
  plugins: [],
}