import '@/styles/globals.css';
import 'katex/dist/katex.min.css';
import type { Viewport } from 'next';

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
	],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
