// tailwind.config.ts
import { type Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // si usas modo oscuro
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#134395",
        "primary-dark": "#0e305f",
        background: "#ffffff",
        foreground: "#1a1a1a",
        card: "#f3f4f6",
        "card-foreground": "#1a1a1a",
        "muted-foreground": "#6b7280",
      },
    },
  },
  plugins: [],
};

export default config;

