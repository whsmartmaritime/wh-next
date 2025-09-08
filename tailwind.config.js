/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
    './public/index.html',
  ],
  darkMode: 'selector', // Enable dark mode with data-theme attribute
  theme: {
    extend: {
      // Giữ breakpoints chuẩn Tailwind + thêm custom
      screens: {
        'xs': '400px',
        // sm: 640px (default)
        // md: 768px (default) 
        // lg: 1024px (default)
        // xl: 1280px (default)
        // 2xl: 1536px (default)
        'header-lg': '1171px', // Custom cho header size
        '3xl': '1920px',
      },
      // Thêm spacing theo sample
      spacing: {
        'gutter': 'var(--gutter-h)',
        'block': 'var(--block-spacing)',
        'header': 'var(--header-height)',
      },
      // Animations
      animation: {
        'slide': 'slide 60s linear infinite',
        'slider': 'slider var(--total-duration) infinite ease-in-out',
        'dots': 'dots var(--total-duration) infinite ease-in-out',
      },
      keyframes: {
        'slide': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // Move exactly half (1 full set)
        },
        'slider': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '8.33%': { opacity: '1', transform: 'scale(1)' },
          '25%': { opacity: '1', transform: 'scale(1)' },
          '33.33%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
        'dots': {
          '0%': { opacity: '0.5', transform: 'scale(1)' },
          '8.33%': { opacity: '1', transform: 'scale(1.2)' },
          '25%': { opacity: '1', transform: 'scale(1.2)' },
          '33.33%': { opacity: '0.5', transform: 'scale(1)' },
          '100%': { opacity: '0.5', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [
    // Plugin for line-clamp
    function({ addUtilities }) {
      addUtilities({
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
      })
    }
  ],
}
