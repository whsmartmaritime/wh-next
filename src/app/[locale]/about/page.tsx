import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BackgroundScanline from '@/components/BackgroundScanline';
import BgGrid from '@/components/BgGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactInfo from '@/components/ContactInfo';
import HeroPage from '@/components/Hero/HeroPage';
import { routing } from '@/i18n/routing';

export async function generateMetadata(props: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await props.params;
	const t = await getTranslations({ locale, namespace: 'about' });

	const title = t('meta.title');
	const description = t('meta.description');
	const ogImage = t('meta.ogImage');

	const base = new URL(
		(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
			/\/$/,
			'',
		),
	);

	const url = new URL(`${locale}/about`, base);

	// Create alternate language URLs from pre-defined canonicals
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, routing.pathnames['/about'][l]]),
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

export default async function AboutPage({
	params,
}: PageProps<'/[locale]/about'>) {
	const { locale } = await params;

	const t = await getTranslations({ locale, namespace: 'about' });
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
							label: b('about'),
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
						title={<h1>{t('hero.title')}</h1>}
						subtitle={<h2>{t('hero.subtitle')}</h2>}
						images={t.raw('hero.images')}
						ctas={t.raw('hero.ctas')}
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
							{t('whoWeAre.title')}
						</h2>
						<div className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))]">
							{[t.raw('whoWeAre.description')]
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
								{t('ourValues.title')}
							</h2>
							<ul className="space-y-4 text-lg lg:text-xl text-justify px-4 lg:px-8 mb-4 lg:mb-8">
								<li>{t('ourValues.value1')}</li>
								<li>{t('ourValues.value2')}</li>
								<li>{t('ourValues.value3')}</li>
								<li>{t('ourValues.value4')}</li>
							</ul>
						</div>

						{/* Cột Mission */}
						<div className="">
							<h2 className="uppercase tracking-[0.25em] font-bold text-xl lg:text-2xl my-6">
								{t('ourMission.title')}
							</h2>
							<p className="text-lg lg:text-xl leading-relaxed text-justify  px-4 lg:px-8">
								{t('ourMission.desc')}
							</p>
							<ul className="space-y-4 text-lg lg:text-xl text-justify  px-4 lg:px-8 mb-4 lg:mb-8">
								<li>{t('ourMission.value1')}</li>
								<li>{t('ourMission.value2')}</li>
								<li>{t('ourMission.value3')}</li>
								<li>{t('ourMission.value4')}</li>
								<li>{t('ourMission.value5')}</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section
				id="contact"
				className="relative scroll-mt-16 container-gutter mx-auto  pt-8 px-4 lg:px-8"
				aria-label="About contact section"
			>
				<h2 className="uppercase tracking-[0.25em] font-bold text-xl lg:text-2xl mb-8">
					{t('contact.title')}
				</h2>

				{/* Info + Map */}
				<div className="grid grid-cols-1 lg:grid-cols-2">
					{/* Contact Info */}
					<div className="items-end leading-relaxed aspect-[25/10] bg-neutral-500/20 border border-neutral-500/20 mb-8">
						<ContactInfo className="text-xl lg:text-2xl w-full h-full " />
					</div>

					<div className="relative w-full aspect-[25/10] mb-8 border border-neutral-500/20">
						<iframe
							title="Google Maps - Wheelhouse Location"
							className="absolute top-0 left-0 w-full h-full"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d932.1718196709141!2d106.6484250696352!3d20.84433085212791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7a0c67daa899%3A0xc27080c90650adc5!2zMjEgQW4gTOG7mWMsIEFuIFRow6FpLCBI4bqjaSBBbiwgSOG6o2kgUGjDsm5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1758013786120!5m2!1svi!2s?hl=en"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
					{/*
          <div id="contactForm" className=" bg-neutral-50 w-full  mx-auto ">
            <form className="space-y-6 " aria-label="Contact form">
              <h3 className="uppercase tracking-[0.25em]  text-lg lg:text-xl">
                {t("contact.contactForm.messageTitle")}
              </h3>
              <input
                type="text"
                className="w-full border border-neutral-300  p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("contact.contactForm.namePlaceholder") + " *"}
                required
              />

              <input
                type="email"
                className="w-full border border-neutral-300  p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("contact.contactForm.emailPlaceholder") + " *"}
                required
              />

              <input
                type="tel"
                className="w-full border border-neutral-300  p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("contact.contactForm.phonePlaceholder")}
              />

              <textarea
                rows={6}
                className="w-full border border-neutral-300  p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("contact.contactForm.messagePlaceholder") + " *"}
                required
              ></textarea>

              <Submit
                type="submit"
                className="w-full min-h-20 my-8 hover:bg-black hover:text-white border-t border-b border-neutral-500/20 focus:ring-white"
              >
                {t("contact.contactForm.submitButton")}
              </Submit>
            </form> 
          </div>
          */}
				</div>
			</section>
		</>
	);
}
