import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import Hero from "@/components/Hero";
import { LogoShowcase } from "@/components/LogoShowcase";
import WhyWheelhouse from "@/blocks/WhyWheelhouse";
import WhatWeDo from "@/blocks/WhatWeDo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "home" });

  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");

  const base = new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  );

  const url = new URL(`${locale}`, base);

  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, new URL(`${l}`, base)])
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

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  // Chỉ tải file ngôn ngữ cần thiết -> TỐI ƯU
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <section
        className="relative w-full min-h-screen text-neutral-200"
        aria-label="Hero section"
      >
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

      <WhyWheelhouse aria-label="Why Wheelhouse section" />

      <WhatWeDo aria-label="What We Do section" />
    </>
  );
}
