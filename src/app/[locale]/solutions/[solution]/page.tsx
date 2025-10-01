import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const allParams = await Promise.all(
    routing.locales.map(async (locale) => {
      const categories = await getCategories(locale, "solutions");
      return categories.map((solution) => ({ locale, solution }));
    })
  );
  return allParams.flat();
}

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

export default async function SolutionPage(props: {
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

  return <></>;
}
