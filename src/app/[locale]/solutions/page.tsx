import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import MediaCard from "@/components/MediaCard";
import Button from "@/components/Button";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "solutions" });

  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");

  const base = new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  );

  const url = new URL(`${locale}/solutions`, base);

  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, routing.pathnames["/solutions"][l]])
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

export default async function SolutionsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "solutions" });

  return (
    <>
      <section
        className=" bg-gradient-to-br from-sky-900 via-slate-900 to-black w-full text-neutral-300"
        aria-label="Solutions hero section"
      >
        <PageHero
          className="container-gutter"
          imgSrc="/images/about/wheelhouse-engineer-with-iridium.webp"
          imgAlt={t("hero.imgAlt")}
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
          ctaPrimary={t("hero.ctaPrimary")}
          ctaSecondary={t("hero.ctaSecondary")}
        />
      </section>
      <div className="container-gutter mt-4">
        <Breadcrumbs
          items={[
            {
              label: locale === "vi" ? "Trang chủ" : "Home",
              href: `/${locale}`,
            },
            {
              label: locale === "vi" ? "Giải pháp" : "Solutions",
            },
          ]}
        />
      </div>
      {/** section overview **/}
      <section className="relative" aria-label="Solutions intro section">
        <BackgroundGrid />
        <div className="container-gutter py-16 lg:py-32">
          <div className="relative bg-neutral-50 w-full h-full items-center justify-center  border border-neutral-500/20 pb-16">
            <BackgroundScanline
              crosshairs="all"
              className="absolute inset-0 "
              opacity={0.1}
            />
            <h2 className="sr-only">{t("overview.title")}</h2>
            <p className="uppercase tracking-[0.25em] opacity-95 font-bold py-8">
              {t("overview.subtitle")}
            </p>
            <div className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))]">
              <p className="block mb-8">{t("overview.desc")}</p>
            </div>
          </div>
        </div>
      </section>
      {/* solution list section */}
      <section
        className="relative container-gutter"
        aria-label="Solutions list section"
      >
        <BackgroundGrid />
        <div className="grid grid-cols-12 items-stretch gap-y-16">
          {(["item1", "item2", "item3", "item4"] as const).map((key, i) => (
            <MediaCard
              className="col-span-12 lg:col-span-6"
              key={i}
              data={{
                href: t(`solutionList.items.${key}.href`),
                title: t(`solutionList.items.${key}.title`),
                description: t(`solutionList.items.${key}.description`),
                imgSrc: t.raw(`solutionList.items.${key}.imgSrc`),
                imgAlt: t(`solutionList.items.${key}.imgAlt`),
              }}
              variant="compact"
            />
          ))}
          <div className="col-span-12 lg:col-span-6 lg:col-start-4 my-auto mx-auto ">
            <h2 className="text-2xl lg:text-4xl font-bold ">
              {t("solutionList.ctaContent.title")}
            </h2>
            <p className=" ">
              {t.rich("solutionList.ctaContent.description", {
                bold: (chunks) => (
                  <strong className="font-bold">{chunks}</strong>
                ),
              })}
            </p>
            <Button
              className="col-span-12 md:col-span-6 lg:col-start-4 min-h-20 my-8 bg-white text-black hover:bg-black hover:text-white border-t border-b border-neutral-500/20 focus:ring-white"
              href={`/${locale}/solutions`}
            >
              {t("solutionList.ctaContent.label")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
