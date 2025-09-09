/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Giữ breakpoints chuẩn Tailwind + thêm custom
      screens: {
        xs: "400px",
        // sm: 640px (default)
        // md: 768px (default)
        // lg: 1024px (default)
        // xl: 1280px (default)
        // 2xl: 1536px (default)
        "header-lg": "1171px", // Custom cho header size
        "3xl": "1920px",
      },
      // Thêm spacing theo sample
      spacing: {
        gutter: "var(--gutter-h)",
        block: "var(--block-spacing)",
        header: "var(--header-height)",
      },
      animation: {
        slide: "slide 60s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".line-clamp-2": {
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
        },
        ".line-clamp-3": {
          display: "-webkit-box",
          "-webkit-line-clamp": "3",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
        },
      });
    },
  ],
};
