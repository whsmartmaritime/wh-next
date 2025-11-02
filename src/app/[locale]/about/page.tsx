import type { Metadata } from 'next';
import BackgroundScanline from '@/components/effects/BackgroundScanline';
import BgGrid from '@/components/effects/BgGrid';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import HeroPage from '@/components/sections/Hero/HeroPage';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const aboutMessages = (await import(`@messages/${locale}/about.json`))
		.default;
	const title = aboutMessages.meta.title;
	const description = aboutMessages.meta.description;
	const ogImage = aboutMessages.meta.ogImage;

	const base = new URL(
		(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
			/\/$/,
			'',
		),
	);

	const url = new URL(`${locale}/about`, base);

	// Create alternate language URLs from pre-defined canonicals
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}${routing.pathnames['/about'][l]}`]),
	);
	return {
		title,
		description,
		alternates: {
			canonical: url,
			languages: {
				...languages,
				'x-default': '/en',
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

export default async function AboutPage({
	params,
}: PageProps<'/[locale]/about'>) {
	const { locale } = await params;

	const aboutMessages = (await import(`@messages/${locale}/about.json`))
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
							label: commonMessages.nav.about.label,
						},
					]}
				/>
			</div>
			<section
				className="relative  mt-8 lg:mt-16"
				aria-label="About hero section"
			>
				<div className="container-gutter">
					<BgGrid className="fixed" />
					<HeroPage
						title={<h1>{aboutMessages.hero.title}</h1>}
						subtitle={<h2>{aboutMessages.hero.subtitle}</h2>}
						images={aboutMessages.hero.images}
						ctas={aboutMessages.hero.ctas}
					/>
				</div>
			</section>

			<section className="relative" aria-label="About who we are section">
				<div className="container-gutter py-16 lg:py-32">
					<div className="relative bg-neutral-200 w-full h-full items-center justify-center  border border-neutral-500/20 pb-16">
						<BackgroundScanline
							crosshairs="all"
							className="absolute inset-0 "
							opacity={0.1}
						/>
						<h2 className="uppercase tracking-[0.25em] opacity-95 font-bold py-8">
							{aboutMessages.whoWeAre.title}
						</h2>
						<div className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))]">
							{aboutMessages.whoWeAre.description
								.flat()
								.map((p: unknown, _i: number) => (
									<p key={String(p)} className="block mb-8">
										{String(p)}
									</p>
								))}
						</div>
					</div>
				</div>
			</section>
			<section className="relative " aria-label="About team section">
				<BackgroundScanline className="absolute inset-0 z-10" opacity={0.1} />
				<div className="container-gutter ">
					<div className="grid grid-cols-1 lg:grid-cols-2 bg-neutral-50 border border-neutral-500/20 divide-x divide-neutral-500/20 z-30">
						{/* Cột Values */}
						<div className=" ">
							<h2 className="uppercase tracking-[0.25em] text-xl lg:text-2xl font-bold my-6">
								{aboutMessages.ourValues.title}
							</h2>
							<ul className="space-y-4 text-lg lg:text-xl text-justify px-4 lg:px-8 mb-4 lg:mb-8">
								<li>{aboutMessages.ourValues.value1}</li>
								<li>{aboutMessages.ourValues.value2}</li>
								<li>{aboutMessages.ourValues.value3}</li>
								<li>{aboutMessages.ourValues.value4}</li>
							</ul>
						</div>

						{/* Cột Mission */}
						<div className="">
							<h2 className="uppercase tracking-[0.25em] font-bold text-xl lg:text-2xl my-6">
								{aboutMessages.ourMission.title}
							</h2>
							<p className="text-lg lg:text-xl leading-relaxed text-justify  px-4 lg:px-8">
								{aboutMessages.ourMission.desc}
							</p>
							<ul className="space-y-4 text-lg lg:text-xl text-justify  px-4 lg:px-8 mb-4 lg:mb-8">
								<li>{aboutMessages.ourMission.value1}</li>
								<li>{aboutMessages.ourMission.value2}</li>
								<li>{aboutMessages.ourMission.value3}</li>
								<li>{aboutMessages.ourMission.value4}</li>
								<li>{aboutMessages.ourMission.value5}</li>
							</ul>
						</div>
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
								name: commonMessages.nav.about.label,
								item: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${locale}${commonMessages.nav.about.href}`,
							},
						],
					}),
				}}
			/>
		</>
	);
}
