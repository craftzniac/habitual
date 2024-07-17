import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        "50": "#F8F4FB",
        "100": "#F4E9FF",
        "300": "#AB76E0",
        "500": "#923DE7",
        "700": "#5E407C",
        "900": "#150426"
      },
      gray: {
        "75": "#817989",
        "50": "#8A8A8A",
        "25": "#CACACA",
        "5": "#F4F4F4",
        "2": "#FAFAFA"
      },
      red: "#BE3455",
      white: "#FFFFFF",
      green: "#6E9C83",
      yellow: "#897821",
      transparent: "transparent"
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
