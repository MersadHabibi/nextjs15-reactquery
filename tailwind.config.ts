import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      screens: {
        "2xl": "1440px",
        xl: "1280px",
        lg: "1024px",
        md: "768px",
        sm: "640px",
        xs: "480px",
      },
      colors: {
        primary: {
          DEFAULT: "rgba(var(--color-primary))",
          blue: "rgba(var(--color-primary-blue))",
          green: "rgba(var(--color-primary-green))",
          red: "rgba(var(--color-primary-red))",
          border: "rgba(var(--color-primary-border))",
        },
        red: {
          DEFAULT: "#ff0000",
        },
        blue: {
          DEFAULT: "#0000ff",
        },
        green: {
          DEFAULT: "#00ff00",
        },
        neutral: {
          DEFAULT: "#F5F5F5",
        },
        text: {
          DEFAULT: "rgba(var(--color-text))",
          100: "rgba(var(--color-text-100))",
          200: "rgba(var(--color-text-200))",
          300: "rgba(var(--color-text-300))",
        },
        link: "rgba(var(--color-link))",
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require("tailwindcss-react-aria-components")({ prefix: "rac" })],
} satisfies Config;
