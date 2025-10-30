import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
	metadataBase: new URL(
		(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
			/\/$/,
			'',
		),
	),
	title: {
		default: 'Wheelhouse Maris',
		template: '%s | Wheelhouse Maris',
	},
	description: 'Wheelhouse Maris - Maritime Electronic Services and Solutions.',
	openGraph: {
		siteName: 'Wheelhouse Maris',
		type: 'website',
		images: [
			{
				url: '/images/og/og-home-en.png',

				width: 1200,
				height: 630,
				alt: 'Wheelhouse Maris',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@Wheelhousemaris',
	},
	icons: [{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }],
};

export default async function LocaleLayout({
	children,
	params,
}: LayoutProps<'/[locale]'>) {
	const { locale } = await params;

	const websiteLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Wheelhouse Maris',
		url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
		description:
			'Leading provider of maritime technology solutions for navigation, safety, and connectivity.',
		publisher: {
			'@type': 'Organization',
			name: 'Wheelhouse Maris',
		},
		inLanguage: ['en', 'vi'],
		potentialAction: {
			'@type': 'SearchAction',
			target: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string',
		},
	};
	const organizationLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Wheelhouse Maris',
		url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
		logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/images/whlogo.svg`,
		description:
			'Wheelhouse provides advanced maritime solutions including navigation systems, GMDSS, e-navigation, and connectivity for the maritime industry.',
		sameAs: ['https://www.linkedin.com/company/wheelhousemaris/'],
	};

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
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
				/>
			</body>
		</html>
	);
}
