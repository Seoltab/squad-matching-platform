import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "wide": { raw: "(min-aspect-ratio: 1/1) and (min-width: 768px)" },
      },
      boxShadow: {
        tactile: "0 2px 0 0 #d8d0ff, 0 4px 12px rgba(93,61,200,0.08)",
        "tactile-hover": "0 2px 0 0 #5d3dc8, 0 8px 20px rgba(93,61,200,0.15)",
        "tactile-press": "inset 0 2px 4px rgba(93,61,200,0.1)",
      },
      colors: {
        seoltab: {
          gray: "#f9f9f9",
          dark: "#200062",
          blue: "#5d3dc8",
          purple: "#9863ff",
          light: "#b7a1ff",
          sub: "#d8d0ff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
