import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'


const config: Config = {
  
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6063EE",
          dark: "#4648D4",
          purple: "#A855F7",
          bg: "#F8F9FA",
          ink: "#1A1C1D",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.06", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(2.2rem, 4.5vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "section": "7rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.75rem",
      },
      boxShadow: {
        "card": "0 0 0 1px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 0 0 1px rgba(96,99,238,0.12), 0 8px 40px rgba(0,0,0,0.1)",
        "dashboard": "0 32px 80px -12px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)",
        "float": "0 20px 60px -8px rgba(96,99,238,0.18)",
        "glow": "0 0 40px rgba(96,99,238,0.25)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.8)",
      },
      backgroundImage: {
        "hero-ambient": "radial-gradient(ellipse 800px 1400px at -10% 20%, rgba(96,99,238,0.07) 0%, transparent 60%), radial-gradient(ellipse 500px 1000px at 110% 50%, rgba(168,85,247,0.05) 0%, transparent 60%)",
        "grid-pattern": "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
        "brand-gradient": "linear-gradient(135deg, #6063EE 0%, #A855F7 100%)",
        "dark-gradient": "linear-gradient(160deg, #1A1C1D 0%, #2d2f30 100%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
      animation: {
        "marquee": "marquee 32s linear infinite",
        "marquee-rev": "marquee-rev 32s linear infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-mid": "float 6s ease-in-out infinite 1s",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
