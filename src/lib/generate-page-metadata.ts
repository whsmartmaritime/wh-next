import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Generate SEO metadata for static pages using next-intl translations
 * Supports parallel translation loading for better performance
 */
export async function generatePageMetadata(
  locale: string,
  namespace: string,
  options?: {
    robots?: { index: boolean; follow: boolean };
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
  };

  // Apply robots settings if provided
  if (options?.robots) {
    baseMetadata.robots = options.robots;
  }

  // Merge with additional metadata if provided
  if (options?.additionalMetadata) {
    return { ...baseMetadata, ...options.additionalMetadata };
  }

  return baseMetadata;
}

/**
 * Generate SEO metadata for home page (single locale approach)
 * Simpler version for home page that doesn't need parallel loading
 */
export async function generateHomeMetadata(locale: string): Promise<Metadata> {
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
    robots: { index: false, follow: false }, // Home specific setting
  };
}
