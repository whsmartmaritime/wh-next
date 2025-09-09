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
  };
}

export default async function AboutPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main>
      <section className=" bg-[url('/images/about/bg.jpg')] bg-center h-40 md:h-72 lg:h-96 w-full text-neutral-300">
        <PageHero
          className="container-gutter"
          rightImageSrc="/images/about/wheelhouse-engineer-with-iridium.webp"
          rightImageAlt={t("hero.rightImageAlt")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
        />
      </section>
      <section className="relative h-300px lg:h-700px bg-gradient-to-br from-gray-900 via-black/90 to-black text-neutral-300">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-justify text-center">
          {t("missionTitle")}
        </h2>
        <p className="text-md xl:text-xl text-justify whitespace-pre-line mb-8 max-w-3xl mx-auto px-4">
          {t("missionIntro")}
        </p>
      </section>
      <section className="bg-gradient-to-bl from-neutral-900 via-slate-900 to-stone-900/50 relative overflow-hidden text-neutral-300"></section>
    </main>
  );
}
