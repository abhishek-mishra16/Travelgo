import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#082B4C",
        orange: "#FF5A1F",
        green: "#0B8F5A",
        sky: "#EAF6FF"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(8,43,76,.12)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 22s linear infinite"
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } }
      }
    }
  },
  plugins: []
};
export default config;
