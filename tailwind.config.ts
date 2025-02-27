import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        background: "#101827",
        foreground: "var(--foreground)",
        green: '#29CFA8', 
        violet: '#9170CC', 
        lightBlue: '#232B41',
        petrolGray: '#2B303D',
        gray: '#D9D9D9', 
        orange: '#E94F1D',
        yellow: '#F9BF18'
      }
    },
  },
  plugins: [],
} satisfies Config;
