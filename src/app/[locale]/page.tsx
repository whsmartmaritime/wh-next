import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/generate-page-metadata";
import { getTranslations } from "next-intl/server";
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
  return generatePageMetadata(locale, "home");
}

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
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
