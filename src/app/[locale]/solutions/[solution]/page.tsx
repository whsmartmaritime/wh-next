import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  // Lấy tất cả solution keys từ pathnames
  const solutionPaths = Object.keys(routing.pathnames).filter(
    (key) => key.startsWith("/solutions/") && key.split("/").length === 3
  );
  return routing.locales.flatMap((locale) =>
    solutionPaths.map((pathKey) => {
      const solution = pathKey.split("/")[2]; // lấy slug
      return { locale, solution };
    })
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; solution: string }>;
}): Promise<Metadata> {
  const { locale, solution } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: `solutions/${solution}`,
  });
  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");

  const base = new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  );

  const url = new URL(`${locale}/solutions/${solution}`, base);
  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      (routing.pathnames as Record<string, { [key: string]: string }>)[
        `/solutions/${solution}`
      ]?.[l],
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

export default async function SolutionPage(props: {
  params: Promise<{ locale: string; solution: string }>;
}) {
  const { locale, solution } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: `solutions/${solution}`,
  });
  return (
    <>
      <h1>{t("hero.titleMain")}</h1>
      <p>{t("hero.description")}</p>
    </>
  );
}
