import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: LayoutProps<'/[locale]'>) {
	const { locale } = await params;
	return (
		<html
			className="scroll-smooth"
			data-scroll-behavior="smooth"
			lang={locale}
			suppressHydrationWarning
		>
			<body className="overflow-x-hidden">
				<Header locale={locale} />
				<main aria-label="Main content">{children}</main>
				<Footer locale={locale} />
			</body>
		</html>
	);
}
