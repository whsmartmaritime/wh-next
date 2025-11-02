import type { Metadata } from 'next';
import { BackgroundScanline } from '@/components/effects/BackgroundScanline';
import BgGrid from '@/components/effects/BgGrid';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import HeroPage from '@/components/sections/Hero/HeroPage';
import AnimatedLink from '@/components/ui/AnimatedLink';
import MediaText from '@/components/ui/MediaText';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const solutionsMessages = (await import(`@messages/${locale}/solutions.json`))
		.default;

	const title = solutionsMessages.meta.title;
	const description = solutionsMessages.meta.description;
	const ogImage = solutionsMessages.meta.ogImage;

	const base = new URL(
		(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
			/\/$/,
			'',
		),
	);

	const url = new URL(`${locale}/solutions`, base);

	// Create alternate language URLs from pre-defined canonicals
	const languages = Object.fromEntries(
		routing.locales.map((l) => [
			l,
			`/${l}${routing.pathnames['/solutions'][l]}`,
		]),
	);
	return {
		title,
		description,
		alternates: {
			canonical: url,
			languages: {
				...languages,
				'x-default': '/',
			},
		},
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

export default async function SolutionsPage({
	params,
}: PageProps<'/[locale]/solutions'>) {
	const { locale } = await params;

	const solutionsMessages = (await import(`@messages/${locale}/solutions.json`))
		.default;
	const commonMessages = (await import(`@messages/${locale}/common.json`))
		.default;
	return (
		<>
			<div className="relative bg-white border-b border-neutral-800/20 z-30">
				<Breadcrumbs
					className="text-lg lg:text-xl container-gutter flex items-center gap-8 h-[66px] sm:h-[76px] xl:h-[90px]"
					items={[
						{
							label: commonMessages.nav.home.label,
							href: `/${locale}`,
						},
						{
							label: commonMessages.nav.solutions.label,
						},
					]}
				/>
			</div>
			<section
				className="relative  mt-8 lg:mt-16"
				aria-label="Services hero section"
			>
				<div className="container-gutter">
					<BgGrid className="fixed" />
					<HeroPage
						title={<h1>{solutionsMessages.hero.title}</h1>}
						subtitle={<h2>{solutionsMessages.hero.subtitle}</h2>}
						images={solutionsMessages.hero.images}
						ctas={solutionsMessages.hero.ctas}
					/>
				</div>
			</section>

			{/** section overview **/}
			<section className="relative" aria-label="Solutions intro section">
				<div className="container-gutter py-16 lg:py-32">
					<div className="relative bg-neutral-50 w-full h-full items-center justify-center  border border-neutral-500/20 pb-16">
						<BackgroundScanline
							crosshairs="all"
							className="absolute inset-0 "
							opacity={0.1}
						/>
						<h2 className="sr-only">{solutionsMessages.overview.title}</h2>
						<p className="uppercase tracking-[0.25em] opacity-95 font-bold py-8">
							{solutionsMessages.overview.subtitle}
						</p>
						<div className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))]">
							<p className="block mb-8">{solutionsMessages.overview.desc}</p>
						</div>
					</div>
				</div>
			</section>
			{/* solution list section */}
			<section
				className="relative container-gutter"
				aria-label="Solutions list section"
			>
				<div className="grid grid-cols-12 items-stretch gap-y-16">
					{(['item1', 'item2', 'item3', 'item4'] as const).map((key, _i) => (
						<MediaText
							className="col-span-12 lg:col-span-6"
							key={key}
							data={{
								href: solutionsMessages.solutionList.items[key].href,
								title: solutionsMessages.solutionList.items[key].title,
								description:
									solutionsMessages.solutionList.items[key].description,
								imgSrc: solutionsMessages.solutionList.items[key].imgSrc,
								imgAlt: solutionsMessages.solutionList.items[key].imgAlt,
							}}
							variant="compact"
						/>
					))}
					<div className="col-span-12 lg:col-span-6 lg:col-start-4 my-auto mx-auto ">
						<h2 className="text-2xl lg:text-4xl font-bold ">
							{solutionsMessages.solutionList.ctaContent.title}
						</h2>
						<p className=" ">
							{solutionsMessages.solutionList.ctaContent.description}
						</p>
						<AnimatedLink
							className=" bg-neutral-50 border-l col-span-12 md:col-span-6 lg:col-start-4 min-h-20 my-8"
							href={`/${locale}${solutionsMessages.solutionList.ctaContent.href}`}
						>
							{solutionsMessages.solutionList.ctaContent.label}
						</AnimatedLink>
					</div>
				</div>
			</section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{
								'@type': 'ListItem',
								position: 1,
								name: commonMessages.nav.home.label,
								item: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${locale}`,
							},
							{
								'@type': 'ListItem',
								position: 2,
								name: commonMessages.nav.solutions.label,
								item: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${locale}${commonMessages.nav.solutions.href}`,
							},
						],
					}),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@graph': [
							{
								'@type': 'Product',
								name: commonMessages.nav.solutions.items.navigation.label,
								description:
									solutionsMessages.solutionList.items.item1.description,
								category: 'Navigation Equipment',
								url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${locale}${commonMessages.nav.solutions.items.navigation.href}`,
								manufacturer: {
									'@type': 'Organization',
									name: 'Wheelhouse Maris',
									url:
										process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
								},
							},
							{
								'@type': 'Product',
								name: commonMessages.nav.solutions.items.gmdss.label,
								description:
									solutionsMessages.solutionList.items.item2.description,
								category: 'GMDSS Equipment',
								url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${locale}${commonMessages.nav.solutions.items.gmdss.href}`,
								manufacturer: {
									'@type': 'Organization',
									name: 'Wheelhouse Maris',
									url:
										process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
								},
							},
							{
								'@type': 'Product',
								name: commonMessages.nav.solutions.items.connectivity.label,
								description:
									solutionsMessages.solutionList.items.item3.description,
								category: 'Satellite Connectivity',
								url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${locale}${commonMessages.nav.solutions.items.connectivity.href}`,
								manufacturer: {
									'@type': 'Organization',
									name: 'Wheelhouse Maris',
									url:
										process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
								},
							},
							{
								'@type': 'Product',
								name: commonMessages.nav.solutions.items['e-navigation'].label,
								description:
									solutionsMessages.solutionList.items.item4.description,
								category: 'E-Navigation Systems',
								url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${locale}${commonMessages.nav.solutions.items['e-navigation'].href}`,
								manufacturer: {
									'@type': 'Organization',
									name: 'Wheelhouse Maris',
									url:
										process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
								},
							},
						],
					}),
				}}
			/>
		</>
	);
}
