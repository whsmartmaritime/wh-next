import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Generate SEO metadata for all pages using next-intl translations
 * Auto-generates canonical URLs from slug and locale
 */
export async function generatePageMetadata(
  locale: string,
  namespace: string,
  options?: {
    additionalMetadata?: Partial<Metadata>;
  }
): Promise<Metadata> {
  // Parallel translation loading for better performance
  const translations = await Promise.all(
    routing.locales.map((l) => getTranslations({ locale: l, namespace }))
  );

  const currentIndex = routing.locales.indexOf(locale as "en" | "vi");
  const t = translations[currentIndex];

  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");

  // Handle both canonical and slug patterns
  let canonical: string;
  try {
    canonical = t("meta.canonical");
  } catch {
    // Fallback to constructing from slug if canonical doesn't exist
    const slug = t("meta.slug");
    canonical = `/${locale}${slug ? `/${slug}` : ""}`;
  }

  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );
  const url = new URL(canonical, base);

  // Create alternate language URLs from canonicals or slugs
  const languages = Object.fromEntries(
    routing.locales.map((l, index) => {
      let localeCanonical: string;
      try {
        localeCanonical = translations[index]("meta.canonical");
      } catch {
        // Fallback to constructing from slug
        const slug = translations[index]("meta.slug");
        localeCanonical = `/${l}${slug ? `/${slug}` : ""}`;
      }
      return [l, new URL(localeCanonical, base)];
    })
  );

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
    // Robots tạm thời trong dev, sẽ bỏ khi production
    robots: { index: false, follow: false },
  };

  // Merge with additional metadata if provided
  if (options?.additionalMetadata) {
    return { ...baseMetadata, ...options.additionalMetadata };
  }

  return baseMetadata;
}
