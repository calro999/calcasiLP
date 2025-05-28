import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true, // これはそのまま
      padding: "0rem", // パディングをなくす場合は0に
      screens: {
        "2xl": "100%", // ここを100%にすると、実質的に最大幅が無くなる
      },
      // あるいは、screensを削除して、常にデフォルトの最大幅（なし）にする
      // screens: {}, // これを削除すると、Tailwindのデフォルトの最大幅（xl: 1280pxなど）も適用されなくなる
    },
    extend: {
      // ... 既存の extend 部分は省略
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config

export default config