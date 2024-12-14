/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8",
        secondary: "#4285f4",
        dark: "#1f2937",
      },
    },
  },
  plugins: [],
}