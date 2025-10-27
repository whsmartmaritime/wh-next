import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BackgroundScanline from '@/components/BackgroundScanline';
import BgGrid from '@/components/BgGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import HeroPage from '@/components/Hero/HeroPage';
import ScrollShowcase from '@/components/ScrollShowcase';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'services' });

	const title = t('meta.title');
	const description = t('meta.description');
	const ogImage = t('meta.ogImage');

	const base = new URL(
		(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
			/\/$/,
			'',
		),
	);

	const url = new URL(`${locale}/services`, base);

	// Create alternate language URLs from pre-defined canonicals
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, routing.pathnames['/services'][l]]),
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

export default async function ServicesPage({
	params,
}: PageProps<'/[locale]/services'>) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'services' });
	const b = await getTranslations({ locale, namespace: 'common.nav' });
	return (
		<>
			<div className="relative bg-white border-b border-neutral-800/20 z-30">
				<Breadcrumbs
					className="text-lg lg:text-xl container-gutter flex items-center gap-8 h-[66px] sm:h-[76px] xl:h-[90px]"
					items={[
						{
							label: b('home'),
							href: `/${locale}`,
						},
						{
							label: b('services.title'),
						},
					]}
				/>
			</div>
			<section className="relative " aria-label="Services hero section">
				<div className="container-gutter mt-8 lg:mt-16">
					<BgGrid className="fixed" />
					<HeroPage
						title={
							<h1>
								{t.rich('hero.title', {
									highlight: (chunk) => (
										<span className="text-sky-700">{chunk}</span>
									),
								})}
							</h1>
						}
						subtitle={<h2>{t('hero.subtitle')}</h2>}
						images={t.raw('hero.images')}
						ctas={t.raw('hero.ctas')}
					/>
				</div>
			</section>

			{/** section qualityOfService **/}
			<section className="relative " aria-label="Quality of service section">
				<div className="container-gutter">
					<div className="relative flex flex-col gap-8 bg-neutral-200 w-full h-full border border-neutral-500/20 mt-16 pb-16 ">
						<BackgroundScanline crosshairs="all" opacity={0.1} />
						<h2 className="uppercase tracking-[0.25em] opacity-95 font-bold mt-8">
							{t('qualityOfService.title')}
						</h2>
						<div className="flex flex-col gap-8 mx-[calc(var(--gutter-h))] ">
							{t
								.raw('qualityOfService.description')
								.flat()
								.map((_: unknown, i: number) => (
									<p
										key={`quality-${i}`}
										className="block text-sm sm:text-lg lg:text-3xl text-justify "
									>
										{t.rich(`qualityOfService.description.${i}`, {
											b: (chunks) => (
												<strong className="font-bold">{chunks}</strong>
											),
										})}
									</p>
								))}
						</div>
					</div>
				</div>
			</section>

			{/** section repairMaintenance **/}
			<section
				id="repair-maintenance"
				className="scroll-mt-32 mt-16"
				aria-label="Repair and Maintenance Services section"
			>
				<div className="container-gutter flex flex-col gap-8">
					<div className="grid grid-cols-12">
						<div className="col-span-12 lg:col-span-6 lg:col-start-4 flex flex-col gap-8">
							<h2 className="text-4xl lg:text-6xl font-bold">
								{t('rm.title')}
							</h2>
							{[t.raw('rm.details')].flat().map((_, i: number) => (
								<p
									key={`rm-${i}`}
									className=" text-justify text-sm sm:text-lg lg:text-2xl"
								>
									{t.rich(`rm.details.${i}`, {
										b: (chunks) => (
											<strong className="font-bold">{chunks}</strong>
										),
									})}
								</p>
							))}
						</div>
					</div>
					<ScrollShowcase
						items={(
							t.raw('rm.items') as Array<{
								title: string;
								description: string[];
								image: { src: string; alt: string };
							}>
						).map((item) => ({
							title: <h3>{item.title}</h3>,
							description: item.description.map(
								(desc: string, descIndex: number) => (
									<p
										key={`rm-desc-${descIndex}`}
										dangerouslySetInnerHTML={{ __html: desc }}
									/>
								),
							),
							image: { src: item.image.src, alt: item.image.alt },
						}))}
					/>
					<div className="grid grid-cols-12 ">
						<div className="relative col-span-12 lg:col-span-6 lg:col-start-4 flex flex-col gap-8">
							<h3 className="text-xl lg:text-3xl font-semibold">
								{t('rm.ctaContent.title')}
							</h3>
							<p className="text-sm sm:text-lg lg:text-2xl">
								{t('rm.ctaContent.description')}
							</p>
							<Button
								className="w-1/2 min-h-20 my-8 bg-black text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
								href={t('rm.ctaContent.href')}
							>
								{t('rm.ctaContent.label')}
							</Button>
						</div>
					</div>
				</div>
			</section>
			{/** section installation **/}
			<section
				id="installation"
				className="relative scroll-mt-32 mt-16"
				aria-label="Installation Services section"
			>
				<div className="container-gutter flex flex-col gap-8">
					<div className="grid grid-cols-12">
						<div className="col-span-12 lg:col-span-6 lg:col-start-4 flex flex-col gap-8">
							<h2 className="text-4xl lg:text-6xl font-bold">
								{t('install.title')}
							</h2>
							{[t.raw('install.details')].flat().map((_, i: number) => (
								<p
									key={`install-${i}`}
									className=" text-justify text-sm sm:text-lg lg:text-2xl"
								>
									{t.rich(`install.details.${i}`, {
										b: (chunks) => (
											<strong className="font-bold">{chunks}</strong>
										),
									})}
								</p>
							))}
						</div>
					</div>
					<ScrollShowcase
						items={(
							t.raw('install.items') as Array<{
								title: string;
								description: string[];
								image: { src: string; alt: string };
							}>
						).map((item) => ({
							title: <h3>{item.title}</h3>,
							description: item.description.map(
								(desc: string, descIndex: number) => (
									<p
										key={`install-desc-${descIndex}`}
										dangerouslySetInnerHTML={{ __html: desc }}
									/>
								),
							),
							image: { src: item.image.src, alt: item.image.alt },
						}))}
					/>
					<div className="grid grid-cols-12 ">
						<div className="relative col-span-12 lg:col-span-6 lg:col-start-4 flex flex-col gap-8">
							<h3 className="text-xl lg:text-3xl font-semibold">
								{t('install.ctaContent.title')}
							</h3>
							<p className="text-sm sm:text-lg lg:text-2xl">
								{t('install.ctaContent.description')}
							</p>
							<Button
								className="w-1/2 min-h-20 my-8 bg-black text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
								href={t('install.ctaContent.href')}
							>
								{t('install.ctaContent.label')}
							</Button>
						</div>
					</div>
				</div>
			</section>
			{/** section survey **/}
			<section
				id="survey"
				className="relative scroll-mt-32 mt-16"
				aria-label="Survey Services section"
			>
				<div className="container-gutter flex flex-col gap-8">
					<div className="grid grid-cols-12">
						<div className="col-span-12 lg:col-span-6 lg:col-start-4 flex flex-col gap-8">
							<h2 className="text-4xl lg:text-6xl font-bold">
								{t('survey.title')}
							</h2>
							{[t.raw('survey.details')].flat().map((_, i: number) => (
								<p
									key={`survey-${i}`}
									className=" text-justify text-sm sm:text-lg lg:text-2xl"
								>
									{t.rich(`survey.details.${i}`, {
										b: (chunks) => (
											<strong className="font-bold">{chunks}</strong>
										),
									})}
								</p>
							))}
						</div>
					</div>

					<div className="grid grid-cols-12 ">
						<div className="relative col-span-12 lg:col-span-6 lg:col-start-4 flex flex-col gap-8">
							<h3 className="text-xl lg:text-3xl font-semibold">
								{t('survey.ctaContent.title')}
							</h3>
							<p className="text-sm sm:text-lg lg:text-2xl">
								{t('survey.ctaContent.description')}
							</p>
							<Button
								className="w-1/2 min-h-20 my-8 bg-black text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
								href={t('survey.ctaContent.href')}
							>
								{t('survey.ctaContent.label')}
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
