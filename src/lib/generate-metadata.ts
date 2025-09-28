import type { Metadata } from "next";

/**
 * Simple metadata generator - KISS principle
 * Takes pre-loaded content and generates SEO metadata
 * No dual loading, no complex logic, just direct conversion
 */
export function generateMetadata(
  title: string,
  description: string,
  ogImage: string,
  canonical: string,
  alternateUrls?: Record<string, string>
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = new URL(canonical, baseUrl);

  // Simple alternate languages if provided
  const languages = alternateUrls
    ? Object.fromEntries(
        Object.entries(alternateUrls).map(([locale, path]) => [
          locale,
          new URL(path, baseUrl),
        ])
      )
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url, ...(languages && { languages }) },
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
}
