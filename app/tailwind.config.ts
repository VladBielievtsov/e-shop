import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

interface ThemeColors {
  [key: string]: {
    DEFAULT: string;
    foreground: string;
  };
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: `#000`,
              foreground: "#fff",
            },
            default: {
              DEFAULT: "#fff",
              foreground: "#000",
            },
          } as ThemeColors,
        },
      },
    }),
  ],
};
export default config;
