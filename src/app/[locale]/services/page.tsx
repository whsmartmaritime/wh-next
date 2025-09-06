import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateMetadata(
	props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
	const { locale } = await props.params;
	const t = await getTranslations({ locale, namespace: 'services' });
	
	const title = t('meta.title');
	const description = t('meta.seoDescription');
	const ogImage = t('meta.ogImage');
	const slug = t('meta.slug');

	const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
	const path = `/${slug}`;
	const url = new URL(`/${locale}${path}`, base);
	
	// Create alternate language URLs with their respective slugs
	const languages: Record<string, URL> = {};
	for (const l of routing.locales) {
		const localeT = await getTranslations({ locale: l, namespace: 'services' });
		const localeSlug = localeT('meta.slug');
		languages[l] = new URL(`/${l}/${localeSlug}`, base);
	}

	return {
		title,
		description,
		alternates: { canonical: url, languages },
		openGraph: { 
			title, 
			description, 
			url, 
			images: [{ 
				url: ogImage, 
				width: 1200, 
				height: 630, 
				alt: title 
			}] 
		},
		twitter: { 
			card: 'summary_large_image', 
			title, 
			description, 
			images: [ogImage] 
		},
	};
}

export default async function ServicePage() {
	const t = await getTranslations('services');
	
	return (
		<div className="container-gutter py-16 md:py-24">
			<header className="mb-12">
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
					{t('h1')}
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
					{t('intro')}
				</p>
			</header>
			
			{/* TODO: Add services grid */}
			<div className="text-center text-gray-500">
				Services content coming soon...
			</div>
		</div>
	);
}
