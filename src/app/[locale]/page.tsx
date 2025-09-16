import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import Hero from "@/components/Hero";
import { LogoShowcase } from "@/components/LogoShowcase";
import WhyWheelhouse from "@/blocks/WhyWheelhouse";
import WhatWeDo from "@/blocks/WhatWeDo";
import LatestNews from "@/blocks/LatestNews";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  // Dùng chung 1 lần getTranslations cho toàn page
  const t = await getTranslations({ locale, namespace: "home" });

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
    routing.locales.map((l) => [l, new URL(t("meta.canonical"), base)])
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

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  const translations = await Promise.all(
    routing.locales.map((l) =>
      getTranslations({ locale: l, namespace: "home" })
    )
  );
  const currentIndex = routing.locales.indexOf(locale as "en" | "vi");
  const t = translations[currentIndex];

  return (
    <main>
      <section className="relative w-full min-h-screen text-neutral-200">
        <BackgroundGrid gradient={true} />
        <BackgroundAnimation />
        <div className="relative container-gutter">
          <Hero
            className="pt-20 pb-16 lg:pt-32 lg:pb-24 mb-8"
            brand={t("hero.brand")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
            ctaText={t("hero.ctaPrimary")}
            heroImage1Alt={t("hero.heroImage1Alt")}
            heroImage2Alt={t("hero.heroImage2Alt")}
            heroImage1Src="/images/Picture1.png"
            heroImage2Src="/images/Picture2.png"
          />
          <div className="relative  text-center ">
            <p className="text-sm uppercase tracking-widest font-medium mb-8 ">
              {t("hero.partnerShowcase", {
                defaultValue: "Partners and Customers",
              })}
            </p>
            <LogoShowcase
              className="pb-16"
              logos={[
                { id: "1", src: "/images/logos/partnerLogo1.png" },
                { id: "2", src: "/images/logos/partnerLogo2.png" },
                { id: "3", src: "/images/logos/partnerLogo3.png" },
                { id: "4", src: "/images/logos/partnerLogo4.png" },
                { id: "5", src: "/images/logos/partnerLogo5.png" },
                { id: "6", src: "/images/logos/partnerLogo6.png" },
                { id: "7", src: "/images/logos/partnerLogo7.png" },
                { id: "8", src: "/images/logos/partnerLogo8.png" },
              ]}
            />
          </div>
        </div>
      </section>

      <WhyWheelhouse />

      <WhatWeDo />

      <LatestNews />
    </main>
  );
}
