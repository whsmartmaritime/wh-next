import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import Hero from "@/components/Hero";
import { LogoShowcase } from "@/components/LogoShowcase";
import WhyWheelhouse from "@/blocks/WhyWheelhouse";
import WhatWeDo from "@/blocks/WhatWeDo";
import LatestNews from "@/blocks/LatestNews";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  // Parallel translation loading for better performance
  const translations = await Promise.all(
    routing.locales.map((l) =>
      getTranslations({ locale: l, namespace: "home" })
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
  };
}

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations("home.hero");

  return (
    <main>
      <section className="relative overflow-visible min-h-screen text-neutral-200">
        <BackgroundAnimation />

        <Hero
          brand={t("brand")}
          title={t("title")}
          subtitle={t("subtitle")}
          ctaText={t("ctaPrimary")}
          heroImage1Alt={t("heroImage1Alt")}
          heroImage2Alt={t("heroImage2Alt")}
          heroImage1Src="/images/Picture1.png"
          heroImage2Src="/images/Picture2.png"
        />
        <div className="relative container-gutter text-center mb-8">
          <p className="text-sm uppercase tracking-widest font-medium">
            {t("partnerShowcase", { defaultValue: "Partners and Customers" })}
          </p>

          <LogoShowcase
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
      </section>
      <section>
        <WhyWheelhouse />
      </section>
      <section>
        <WhatWeDo />
      </section>
      <section>
        <LatestNews />
      </section>
    </main>
  );
}
