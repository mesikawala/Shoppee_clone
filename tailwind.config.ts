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
          DEFAULT: "#DC2626",
          dark: "#B91C1C",
          light: "#FEF2F2",
          50: "#FEF2F2",
          100: "#FEE2E2",
        },
        flash: "#EF4444",
        savings: "#16A34A",
        star: "#F59E0B",
        ink: "#1F2937",
        primary: "#DC2626",
        secondary: "#1E40AF",
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
