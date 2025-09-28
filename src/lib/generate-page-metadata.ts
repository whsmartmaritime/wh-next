import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Locale = "en" | "vi";

interface MetadataOptions {
  additionalMetadata?: Partial<Metadata>;
}

export async function generatePageMetadata(
  locale: string,
  namespace: string,
  options?: MetadataOptions
): Promise<Metadata> {
  // Parallel translation loading for better performance
  const translations = await Promise.all(
    routing.locales.map((l: Locale) =>
      getTranslations({ locale: l, namespace })
    )
  );

  const currentIndex = routing.locales.indexOf(locale as Locale);
  const t = translations[currentIndex];

  // Extract metadata from translations
  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");
  const slug = t("meta.slug");

  // Build base URL
  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );

  // Generate canonical URL from locale and slug
  const canonical = `/${locale}${slug ? `/${slug}` : ""}`;
  const url = new URL(canonical, base);

  // Generate alternate language URLs
  const languages = Object.fromEntries(
    routing.locales.map((l: Locale, index: number) => {
      const localeSlug = translations[index]("meta.slug");
      const localeCanonical = `/${l}${localeSlug ? `/${localeSlug}` : ""}`;
      return [l, new URL(localeCanonical, base)];
    })
  );

  // Build metadata object
  const baseMetadata: Metadata = {
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
    // TODO: Remove robots when going to production
    robots: { index: false, follow: false },
  };

  return options?.additionalMetadata
    ? { ...baseMetadata, ...options.additionalMetadata }
    : baseMetadata;
}
