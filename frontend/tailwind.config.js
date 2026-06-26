/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Archivo", "Inter", "sans-serif"],
      },
      colors: {
        cream: "var(--cream)",
        surface: "var(--surface)",
        card: "var(--card)",
        line: "var(--line)",
        ink: "var(--ink)",
        sub: "var(--sub)",
        ad: "var(--ad)",
        redsoft: "var(--red-soft)",
        brand: "#FF6B5E",
        banner: "#F5C84B",
      },
      boxShadow: {
        soft: "3px 3px 0 0 var(--shadow)",
        lift: "6px 6px 0 0 var(--shadow)",
      },
    },
  },
  plugins: [],
};
