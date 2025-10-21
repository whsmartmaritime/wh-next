import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeroPage from "@/components/Hero/HeroPage";
import BgGrid from "@/components/BgGrid";
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

export default async function SolutionsPage({
  params,
}: PageProps<"/[locale]/solutions">) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "solutions" });

  return (
    <>
      <div className="relative bg-white border-b border-neutral-800/20 z-30">
        <Breadcrumbs
          className="text-lg lg:text-xl container-gutter flex items-center gap-8 h-[66px] sm:h-[76px] xl:h-[90px]"
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
      <section
        className="relative  mt-8 lg:mt-16"
        aria-label="Services hero section"
      >
        <div className="container-gutter">
          <BgGrid className="fixed" />
          <HeroPage
            title={<h1>{t("hero.title")}</h1>}
            subtitle={<h2>{t("hero.subtitle")}</h2>}
            images={t.raw("hero.images")}
            ctas={t.raw("hero.ctas")}
          />
        </div>
      </section>

      {/** section overview **/}
      <section className="relative" aria-label="Solutions intro section">
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
