import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import BackgroundScanline from "@/components/BackgroundScanline";
import BackgroundGrid from "@/components/BackgroundGrid";
import ContactInfo from "@/components/ContactInfo";
import Submit from "@/components/Submit";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "about" });

  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");

  const base = new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  );

  const url = new URL(`${locale}/about`, base);

  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, routing.pathnames["/about"][l]])
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
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function AboutPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <section
        className=" bg-gradient-to-br from-sky-900 via-slate-900 to-black w-full text-neutral-300"
        aria-label="About hero section"
      >
        <PageHero
          className="container-gutter"
          rightImageSrc="/images/about/wheelhouse-engineer-with-iridium.webp"
          rightImageAlt={t("hero.rightImageAlt")}
          titlePre={t("hero.titlePre")}
          titleMain={t("hero.titleMain")}
          subtitle={t("hero.subtitle")}
          ctaPrimary={t("hero.ctaPrimary")}
          ctaSecondary={t("hero.ctaSecondary")}
        />
      </section>
      <section className="relative " aria-label="About who we are section">
        <BackgroundGrid />
        <div className="container-gutter py-16 lg:py-32">
          <div className="relative bg-neutral-200 w-full h-full items-center justify-center  border border-neutral-500/20 pb-16">
            <BackgroundScanline
              crosshairs="all"
              className="absolute inset-0 "
              opacity={0.1}
            />
            <h2 className="uppercase tracking-[0.25em] opacity-95 font-bold py-8">
              {t("whoWeAre.title")}
            </h2>
            <div className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))]">
              {[t.raw("whoWeAre.description")]
                .flat()
                .map((p: unknown, i: number) => (
                  <p key={i} className="block mb-8">
                    {String(p)}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-black text-neutral-200"
        aria-label="About team section"
      >
        <div className="container-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-neutral-500/20 divide-x divide-neutral-500/20">
            {/* Cột Values */}
            <div className="">
              <h2 className="uppercase tracking-[0.25em] text-xl lg:text-2xl font-bold my-6">
                {t("ourValues.title")}
              </h2>
              <ul className="space-y-4 text-lg lg:text-xl text-justify px-4 lg:px-8 mb-4 lg:mb-8">
                <li>{t("ourValues.value1")}</li>
                <li>{t("ourValues.value2")}</li>
                <li>{t("ourValues.value3")}</li>
                <li>{t("ourValues.value4")}</li>
              </ul>
            </div>

            {/* Cột Mission */}
            <div className="">
              <h2 className="uppercase tracking-[0.25em] font-bold text-xl lg:text-2xl my-6">
                {t("ourMission.title")}
              </h2>
              <p className="text-lg lg:text-xl leading-relaxed text-justify  px-4 lg:px-8">
                {t("ourMission.desc")}
              </p>
              <ul className="space-y-4 text-lg lg:text-xl text-justify  px-4 lg:px-8 mb-4 lg:mb-8">
                <li>{t("ourMission.value1")}</li>
                <li>{t("ourMission.value2")}</li>
                <li>{t("ourMission.value3")}</li>
                <li>{t("ourMission.value4")}</li>
                <li>{t("ourMission.value5")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="relative bg-neutral-200 text-neutral-900"
        aria-label="About contact section"
      >
        <BackgroundGrid />
        <div className="container-gutter mx-auto  pt-8 px-4 lg:px-8">
          <h2 className="uppercase tracking-[0.25em] font-bold text-xl lg:text-2xl">
            {t("contact.title")}
          </h2>

          {/* Info + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="text-xl lg:text-2xl leading-relaxed  px-4 lg:px-8 my-8 lg:my-16">
              <ContactInfo />
            </div>

            {/* Google Map */}
            <div className="relative w-full h-[350px] z-10 ">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d932.1718196709141!2d106.6484250696352!3d20.84433085212791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7a0c67daa899%3A0xc27080c90650adc5!2zMjEgQW4gTOG7mWMsIEFuIFRow6FpLCBI4bqjaSBBbiwgSOG6o2kgUGjDsm5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1758013786120!5m2!1svi!2s?hl=en"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contactForm" className=" scroll-mt-30 my-16">
            <BackgroundScanline
              crosshairs="all"
              className="absolute inset-0 "
              opacity={0.0}
            />
          </div>
          <div className="w-full xl:w-1/2 mx-auto  ">
            <form className="space-y-6" aria-label="Contact form">
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
                rows={5}
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
        </div>
      </section>
    </>
  );
}
