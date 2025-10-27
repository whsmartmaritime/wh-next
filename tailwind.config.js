/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './public/index.html'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			screens: {
				xs: '400px',
				// sm: 640px (default)
				// md: 768px (default)
				// lg: 1024px (default)
				// xl: 1280px (default)
				// 2xl: 1536px (default)
				'header-lg': '1171px',
				'3xl': '1920px',
			},
			spacing: {
				gutter: 'var(--gutter-h)',
				block: 'var(--block-spacing)',
				header: 'var(--header-height)',
			},
		},
	},
	plugins: [
		({ addUtilities }) => {
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
			});
		},
	],
};
