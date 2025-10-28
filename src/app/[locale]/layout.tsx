import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: LayoutProps<'/[locale]'>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<NextIntlClientProvider locale={locale} messages={{}}>
			<Header locale={locale} />
			<main aria-label="Main content">{children}</main>
			<Footer locale={locale} />
		</NextIntlClientProvider>
	);
}
