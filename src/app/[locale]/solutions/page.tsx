import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateMetadata(
	props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
	const { locale } = await props.params;
	const [tNav, tMeta] = await Promise.all([
		getTranslations({ locale, namespace: 'Nav' }),
		getTranslations({ locale, namespace: 'MetaDataHome' }).catch(() => null),
	]);
	const title = tNav('solutions.title');
	const description = tMeta ? tMeta('description') : undefined;

	const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
	const path = '/solution';
	const url = new URL(`/${locale}${path}`, base);
	const languages = Object.fromEntries(routing.locales.map((l) => [l, new URL(`/${l}${path}`, base)]));

	return {
		title,
		description,
		alternates: { canonical: url, languages },
		openGraph: { title, description, url, images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: title }] },
		twitter: { card: 'summary_large_image', title, description, images: ['/images/og-image.jpg'] },
	};
}

export default async function SolutionPage() {
	const t = await getTranslations('navigation');
	return <div className="container-gutter py-block"><h1 className="text-3xl font-bold">{t('solutions.title')}</h1></div>;
}
