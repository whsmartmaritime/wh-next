import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import BackgroundScanline from "@/components/BackgroundScanline";
import BackgroundGrid from "@/components/BackgroundGrid";

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
    <main>
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
      <section className="relative w-full bg-gradient-to-b from-cyan-50/40 to-transparent dark:from-cyan-950/20 dark:to-transparent">
        <BackgroundGrid className="z-0" />
        <div className="container-gutter py-[calc(var(--gutter-h))]">
          <div className="relative w-full h-full items-center justify-center pb-16">
            <BackgroundScanline
              crosshairs="all"
              className="absolute inset-0 z-1"
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
      </section>
      <section className="relative">
        <div className="container-gutter py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Cột Values */}
            <div className="boder border-gray-300">
              <h2 className="uppercase tracking-[0.25em] font-bold mb-6">
                {t("ourValues.title")}
              </h2>
              <ul className="space-y-4 text-lg lg:text-xl">
                <li>{t("ourValues.value1")}</li>
                <li>{t("ourValues.value2")}</li>
                <li>{t("ourValues.value3")}</li>
                <li>{t("ourValues.value4")}</li>
              </ul>
            </div>

            {/* Cột Mission */}
            <div>
              <h2 className="uppercase tracking-[0.25em] font-bold mb-6">
                {t("ourMission.title")}
              </h2>
              <p className="text-lg lg:text-2xl leading-relaxed text-justify">
                {t("ourMission.desc")}
              </p>
              <ul className="space-y-4 text-lg lg:text-xl">
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
    </main>
  );
}
