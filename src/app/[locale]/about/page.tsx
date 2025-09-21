import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import BackgroundScanline from "@/components/BackgroundScanline";
import BackgroundGrid from "@/components/BackgroundGrid";
import ContactInfo from "@/components/ContactInfo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  // Parallel translation loading for better performance
  const translations = await Promise.all(
    routing.locales.map((l) =>
      getTranslations({ locale: l, namespace: "about" })
    )
  );

  const currentIndex = routing.locales.indexOf(locale as "en" | "vi");
  const t = translations[currentIndex];

  const title = t("meta.title");
  const description = t("meta.seoDescription");
  const ogImage = t("meta.ogImage");
  const canonical = t("meta.canonical");

  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );
  const url = new URL(canonical, base);

  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l, index) => [
      l,
      new URL(translations[index]("meta.canonical"), base),
    ])
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
    robots: { index: false, follow: false }, // Ngăn bot index trang này
  };
}

export default async function AboutPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <section className=" bg-gradient-to-br from-sky-900 via-slate-900 to-black w-full text-neutral-300">
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
      <section className="bg-neutral-200 text-neutral-900">
        <div className="relative inset-0 pointer-events-none h-[calc(var(--gutter-h))]">
          <BackgroundGrid />
        </div>
        <div className="container-gutter">
          <div className="relative w-full h-full items-center justify-center border border-neutral-500/20 pb-16">
            <BackgroundScanline
              crosshairs="all"
              className="absolute inset-0 "
              opacity={0.1}
            />
            <h2 className="uppercase tracking-[0.25em] opacity-95 font-bold py-8">
              {t("whoWeAre.title")}
            </h2>
            <div className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))]">
              <p className="block mb-8">{t("whoWeAre.desc1")}</p>
              <p className="block mb-8">{t("whoWeAre.desc2")}</p>
            </div>
          </div>
        </div>
        <div className="relative inset-0 pointer-events-none h-[calc(var(--gutter-h))]">
          <BackgroundGrid />
        </div>
      </section>
      <section className="bg-black text-neutral-200">
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
      <section className="relative bg-neutral-200 text-neutral-900">
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
          <div className="my-16">
            <BackgroundScanline
              crosshairs="all"
              className="absolute inset-0 "
              opacity={0.1}
            />
          </div>
          <div className="w-full xl:w-1/2 mx-auto border border-neutral-500/20  p-8 ">
            <h3 className="font-semibold text-xl mb-6">Gửi tin nhắn</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Số điện thoại (tuỳ chọn)
                </label>
                <input
                  type="tel"
                  className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nội dung
                </label>
                <textarea
                  rows={5}
                  className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Gửi tin nhắn
              </button>
            </form>

            <p className="text-sm text-neutral-500 mt-4"></p>
          </div>
        </div>
      </section>
    </>
  );
}
