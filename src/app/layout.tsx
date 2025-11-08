import '@/styles/globals.css';
import 'katex/dist/katex.min.css';
import type { Viewport } from 'next';



export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
