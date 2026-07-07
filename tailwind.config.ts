import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#EE4D2D",
          dark: "#D7401F",
          light: "#FFF1EE",
          50: "#FFF1EE",
          100: "#FFE1D9",
        },
        flash: "#FF424E",
        savings: "#26AA99",
        star: "#FFC400",
        ink: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04)",
        pop: "0 8px 24px rgba(0,0,0,0.12)",
      },
      maxWidth: {
        shop: "1200px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
