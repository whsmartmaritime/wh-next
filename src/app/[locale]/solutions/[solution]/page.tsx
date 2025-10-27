import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import { BackgroundScanline } from '@/components/BackgroundScanline';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import MediaText from '@/components/MediaText';
import { routing } from '@/i18n/routing';
import {
	entriesByCategory,
	featureByCategory,
	type Locales,
	type PostEntry,
} from '@/lib/postIndex.generated';

export function generateStaticParams() {
	// Lấy tất cả solution keys từ pathnames
	const solutionPaths = Object.keys(routing.pathnames).filter(
		(key) => key.startsWith('/solutions/') && key.split('/').length === 3,
	);
	return routing.locales.flatMap((locale) =>
		solutionPaths.map((pathKey) => {
			const solution = pathKey.split('/')[2]; // lấy slug
			return { locale, solution };
		}),
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; solution: string }>;
}): Promise<Metadata> {
	const { locale, solution } = await params;
	const t = await getTranslations({
		locale,
		namespace: `solutions/${solution}`,
	});
	const title = t('meta.title');
	const description = t('meta.description');
	const ogImage = t('meta.ogImage');

	const base = new URL(
		(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
			/\/$/,
			'',
		),
	);

	const url = new URL(`${locale}/solutions/${solution}`, base);
	const languages = Object.fromEntries(
		routing.locales.map((l) => [
			l,
			`/${l}${
				(routing.pathnames as Record<string, { [key: string]: string }>)[
					`/solutions/${solution}`
				]?.[l]
			}`,
		]),
	);
	return {
		title,
		description,
		alternates: { canonical: url, languages },
		openGraph: {
			title,
			description,
			url,
			images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function SolutionPage({
	params,
}: PageProps<'/[locale]/solutions/[solution]'>) {
	const { locale, solution } = await params;
	const t = await getTranslations({
		locale,
		namespace: `solutions/${solution}`,
	});
	const b = await getTranslations({
		locale,
		namespace: `common.nav`,
	});
	const l = locale as Locales;
	// Cho phép index bằng string mà không dùng any
	const featureMap = featureByCategory as unknown as Record<
		Locales,
		Record<string, PostEntry | null>
	>;
	const entriesMap = entriesByCategory as unknown as Record<
		Locales,
		Record<string, ReadonlyArray<PostEntry>>
	>;

	const feature = featureMap[l]?.[solution] ?? null;
	const items = entriesMap[l]?.[solution] ?? [];

	return (
		<>
			<header className="relative container-gutter scroll-mt-16">
				<BackgroundGrid />
				<div className="  grid grid-cols-12 py-12 lg:py-16">
					<h1 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-6 ">
						{t('hero.title')}
					</h1>
					<h2 className="col-span-12 lg:col-span-3 lg:col-start-10 text-lg lg:text-xl text-muted-foreground text-justify whitespace-pre-line  max-w-2xl">
						{t.rich('hero.subtitle', {
							bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
						})}
					</h2>
				</div>
				<MediaText
					className=" "
					data={{
						href: `#`,
						title: t('hero.cardTitle'),
						description: t('hero.cardDescription'),
						imgSrc: t.raw('hero.imgSrc'),
						imgAlt: t('hero.imgAlt'),
					}}
					variant="featured"
				/>
			</header>

			<div className="container-gutter mt-4">
				<Breadcrumbs
					items={[
						{
							label: b('home'),
							href: `/${locale}`,
						},
						{
							label: b('solutions.title'),
							href: `/${locale}/solutions/`,
						},
						{
							label: b(`solutions.${solution}`),
						},
					]}
				/>
			</div>

			{/** overview **/}

			<section className="relative " aria-label="Overview section">
				<BackgroundGrid />
				<div className="container-gutter py-16 lg:py-32">
					<div className="relative bg-neutral-200 w-full h-full items-center justify-center  border border-neutral-500/20 pb-16 mb-8 lg:mb-16">
						<BackgroundScanline
							crosshairs="all"
							className="absolute inset-0 "
							opacity={0.1}
						/>
						<h2 className="text-sm sm:text-lg lg:text-4xl font-bold py-8">
							{t('overview.title')}
						</h2>

						<p className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))] py-8">
							{t('overview.description')}
						</p>
					</div>
					<div className=" items-center mb-8 lg:mb-16 ">
						<h2 className="font-semibold text-2xl lg:text-4xl mb4 lg:mb-8">
							{t('ctaContent.title')}
						</h2>
						<p className="w-full lg:w-1/2 text-sm sm:text-lg lg:text-2xl text-justify mb-4 lg:mb-8">
							{t('ctaContent.description')}
						</p>
						<Button
							className="w-full lg:w-1/2 min-h-20 mb-4 lg:mb-8 bg-black text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
							href={`/about#contact`}
						>
							{t('ctaContent.label')}
						</Button>
					</div>
				</div>
			</section>

			{feature || items.length > 0 ? (
				<section
					className="relative container-gutter py-8"
					aria-label="Category posts"
				>
					<BackgroundGrid />

					<h2 className="font-semibold text-2xl lg:text-4xl mb-4 lg:mb-8">
						{t('blogPosts.title')}
					</h2>
					<p className="max-w-lg mb-4 lg:mb-8 text-muted-foreground">
						{t('blogPosts.description')}
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2">
						{feature ? (
							<article>
								<MediaText
									className=""
									data={{
										href: feature.route,
										title: feature.title,
										description: [feature.publishedAt, feature.author]
											.filter(Boolean)
											.join(' • '),
										imgSrc: feature.ogImage,
										imgAlt: feature.title ?? 'Article image',
									}}
									variant="featured"
								/>
							</article>
						) : null}
						{items.map((p: PostEntry) => (
							<article key={p.route}>
								<MediaText
									data={{
										href: p.route,
										title: p.title,
										description: [p.publishedAt, p.author]
											.filter(Boolean)
											.join(' • '),
										imgSrc: p.ogImage,
										imgAlt: p.title ?? 'Article image',
									}}
									variant="compact"
								/>
							</article>
						))}
					</div>
				</section>
			) : null}
		</>
	);
}
