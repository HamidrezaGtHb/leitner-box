import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core backgrounds
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface2))",
        muted: "hsl(var(--muted))",

        // Borders
        border: "hsl(var(--border))",

        // Text
        text: "hsl(var(--text))",
        "text-muted": "hsl(var(--text-muted))",

        // Accent
        accent: {
          DEFAULT: "hsl(var(--accent))",
          fg: "hsl(var(--accent-fg))",
        },

        // Semantic colors
        success: {
          DEFAULT: "hsl(var(--success))",
          fg: "hsl(var(--success-fg))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          fg: "hsl(var(--warning-fg))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          fg: "hsl(var(--danger-fg))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          fg: "hsl(var(--info-fg))",
        },

        // German article colors
        der: "hsl(var(--der))",
        die: "hsl(var(--die))",
        das: "hsl(var(--das))",

        // Focus ring
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        "2xl": "1rem",
        xl: "var(--radius)",
        lg: "calc(var(--radius) - 2px)",
        md: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 hsl(var(--shadow-color) / 0.05)",
        DEFAULT: "0 1px 3px 0 hsl(var(--shadow-color) / 0.1), 0 1px 2px -1px hsl(var(--shadow-color) / 0.1)",
        md: "0 4px 6px -1px hsl(var(--shadow-color) / 0.1), 0 2px 4px -2px hsl(var(--shadow-color) / 0.1)",
        lg: "0 10px 15px -3px hsl(var(--shadow-color) / 0.1), 0 4px 6px -4px hsl(var(--shadow-color) / 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
