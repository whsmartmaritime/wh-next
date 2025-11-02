import type { Metadata } from 'next';
import BackgroundScanline from '@/components/effects/BackgroundScanline';
import BgGrid from '@/components/effects/BgGrid';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactForm from '@/components/sections/ContactForm';
import HeroPage from '@/components/sections/Hero/HeroPage';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const contactMessages = (await import(`@messages/${locale}/contact.json`))
		.default;
	const title = contactMessages.meta.title;
	const description = contactMessages.meta.description;
	const ogImage = contactMessages.meta.ogImage;

	const base = new URL(
		(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
			/\/$/,
			'',
		),
	);

	const url = new URL(`${locale}/contact`, base);

	// Create alternate language URLs from pre-defined canonicals
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}${routing.pathnames['/contact'][l]}`]),
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

export default async function ContactPage({
	params,
}: PageProps<'/[locale]/contact'>) {
	const { locale } = await params;

	const contactMessages = (await import(`@messages/${locale}/contact.json`))
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
							label: commonMessages.nav.contact.label,
						},
					]}
				/>
			</div>
			<section
				className="relative  mt-8 lg:mt-16"
				aria-label="Contact hero section"
			>
				<div className="container-gutter">
					<BgGrid className="fixed z-20" />
					<HeroPage
						className="z-30"
						title={<h1>{contactMessages.hero.title}</h1>}
						subtitle={<h2>{contactMessages.hero.subtitle}</h2>}
						images={contactMessages.hero.images}
						ctas={contactMessages.hero.ctas}
					/>
				</div>
			</section>

			<section
				className="relative  py-8 lg:py-16"
				aria-label="wheelhouse contact information section"
			>
				<div className="container-gutter grid grid-cols-12 items-center">
					<div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
						<h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold ">
							{contactMessages.contactInfo.title}
						</h2>
						<div className="flex gap-2 text-md xl:text-xl text-justify">
							<svg
								className="w-5 h-5 text-nature-500 mt-1 flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<address>
								{contactMessages.contactInfo.address.streetAddress},{' '}
								{contactMessages.contactInfo.address.ward},{' '}
								{contactMessages.contactInfo.address.city}
								{locale === 'en' && (
									<>, {contactMessages.contactInfo.address.country}</>
								)}
							</address>
						</div>
					</div>

					<div className="relative col-span-12 lg:col-span-6 lg:col-start-7 flex flex-wrap flex-row">
						<BackgroundScanline />
						<div className="flex flex-col w-full md:w-1/2 gap-2 lg:gap-8 bg-neutral-50 hover:bg-transparent  transition-all  z-10 hover:-translate-y-2 duration-500 ease-in-out">
							<h3 className="text-sm uppercase tracking-[0.2em] font-semibold mt-4 sm:mt-8 lg:mt-16">
								{contactMessages.contactInfo.phone.label}
							</h3>

							<a
								href={`tel:${contactMessages.contactInfo.phone.link}`}
								className="text-sm lg:text-base  leading-relaxed mb-2 sm:mb-4 lg:mb-8 flex gap-2 hover:underline hover:text-sky-500"
							>
								<svg
									className="w-5 h-5 text-nature-500 flex-shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
								{contactMessages.contactInfo.phone.display}
							</a>
						</div>
						{Object.entries(contactMessages.contactInfo.emails).map(
							([key, email]) => {
								const emailData = email as { label: string; base64: string };
								return (
									<div
										key={key}
										className="flex flex-col w-full md:w-1/2 gap-2 lg:gap-8 bg-neutral-50 hover:bg-transparent  transition-all  z-10 hover:-translate-y-2 duration-500 ease-in-out"
									>
										<h3 className="text-sm uppercase tracking-[0.2em] font-semibold mt-4 sm:mt-8 lg:mt-16">
											{emailData.label}
										</h3>
										<a
											href={`mailto:${Buffer.from(
												emailData.base64,
												'base64',
											).toString('utf-8')}`}
											className=" w-3/4 text-sm lg:text-base  leading-relaxed mb-2 sm:mb-4 lg:mb-8 flex gap-2 hover:underline hover:text-sky-500"
										>
											<svg
												className="w-5 h-5 text-nature-500 flex-shrink-0"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
											{Buffer.from(emailData.base64, 'base64').toString(
												'utf-8',
											)}
										</a>
									</div>
								);
							},
						)}
					</div>
				</div>
			</section>

			<section
				id="contact-form"
				className="relative scroll-mt-16 container-gutter"
				aria-label="contact contact section"
			>
				<div className="grid grid-cols-12 mt-8 lg:mt-16 items-center">
					<div className="col-span-12 lg:col-span-3 flex flex-col gap-8 mb-8 lg:mb-0">
						<h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold ">
							{contactMessages.contactForm.title}
						</h2>

						<p className="text-md lg:text-lg text-justify">
							{contactMessages.contactForm.description}
						</p>
					</div>
					<ContactForm
						className="col-span-12 lg:col-span-6 lg:col-start-7"
						contactMessages={contactMessages}
						locale={locale}
					/>
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
								name: commonMessages.nav.contact.label,
								item: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/${locale}${commonMessages.nav.contact.href}`,
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
						'@type': 'LocalBusiness',
						name: contactMessages.contactInfo.companyName,
						url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
						telephone: contactMessages.contactInfo.phone.link,
						email: Buffer.from(
							(
								Object.values(contactMessages.contactInfo.emails)[0] as {
									base64: string;
								}
							).base64,
							'base64',
						).toString('utf-8'),
						address: {
							'@type': 'PostalAddress',
							streetAddress: contactMessages.contactInfo.address.streetAddress,
							addressLocality: contactMessages.contactInfo.address.ward,
							addressRegion: contactMessages.contactInfo.address.city,
							addressCountry: contactMessages.contactInfo.address.country,
						},
						geo: {
							'@type': 'GeoCoordinates',
							latitude: 20.84433,
							longitude: 106.64842,
						},
						contactPoint: Object.entries(
							contactMessages.contactInfo.emails,
						).map(([key, email]) => {
							const emailData = email as { label: string; base64: string };
							return {
								'@type': 'ContactPoint',
								telephone: contactMessages.contactInfo.phone.link,
								email: Buffer.from(emailData.base64, 'base64').toString(
									'utf-8',
								),
								contactType: key,
								areaServed: 'Global',
								availableLanguage: ['English', 'Vietnamese'],
							};
						}),
						slogan: 'Maneuvering? Go Wheelhouse. Servicing? Call Wheelhouse.',
					}),
				}}
			/>
		</>
	);
}
