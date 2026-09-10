import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",       // primary black background
        panel: "#141414",     // slightly raised surface on black
        line: "#2b2b2b",      // hairline / borders (grey)
        muted: "#9a958c",     // muted warm grey text
        paper: "#f2f0ea",     // off-white text / background
        brass: "#c8a24a",     // gold accent
        brassLight: "#e2c273",// gold hover/highlight
        rust: "#8a4a2f",      // small warning/urgent accent, used sparingly
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
