import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

type Params = { locale: string; slug: string };

export async function generateMetadata(
	props: { params: Promise<Params> }
): Promise<Metadata> {
	const { locale, slug } = await props.params;
	const tNav = await getTranslations({ locale, namespace: 'Nav' });
	const title = `${tNav('blog')}: ${slug}`;
	const description = undefined;

	const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
	const path = `/blog/${slug}`;
	const url = new URL(`/${locale}${path}`, base);
	const languages = Object.fromEntries(routing.locales.map((l) => [l, new URL(`/${l}${path}`, base)]));

	return {
		title,
		description,
		alternates: { canonical: url, languages },
		openGraph: { title, description, url, images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: title }] },
		twitter: { card: 'summary_large_image', title, images: ['/images/og-image.jpg'] },
	};
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
	const { slug } = await props.params;
	const t = await getTranslations('Nav');
	return (
		<div className="container-gutter py-block">
			<h1 className="text-3xl font-bold">{t('blog')}</h1>
			<p className="mt-4 text-base text-muted-foreground">{slug}</p>
		</div>
	);
}
