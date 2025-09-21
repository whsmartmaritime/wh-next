import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  // Parallel translation loading for better performance
  const translations = await Promise.all(
    routing.locales.map((l) =>
      getTranslations({ locale: l, namespace: "services" })
    )
  );

  const currentIndex = routing.locales.indexOf(locale as "en" | "vi");
  const t = translations[currentIndex];

  const title = t("meta.title");
  const description = t("meta.description");
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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

export default async function ServicePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "services" });

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
    </>
  );
}
