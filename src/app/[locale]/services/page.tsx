import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import BackgroundScanline from "@/components/BackgroundScanline";
import BackgroundGrid from "@/components/BackgroundGrid";
import Image from "next/image";
import Button from "@/components/Button";
import MediaCard from "@/components/MediaCard";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "services" });

  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");

  const base = new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  );

  const url = new URL(`${locale}/services`, base);

  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, routing.pathnames["/services"][l]])
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

export default async function ServicesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <section
        className=" bg-gradient-to-br from-sky-900 via-slate-900 to-black w-full text-neutral-300"
        aria-label="Services hero section"
      >
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
      {/** section qualityOfService **/}

      <section className="relative " aria-label="Services intro section">
        <BackgroundGrid />
        <div className="container-gutter py-16 lg:py-32">
          <div className="relative bg-neutral-200 w-full h-full items-center justify-center  border border-neutral-500/20 pb-16">
            <BackgroundScanline
              crosshairs="all"
              className="absolute inset-0 "
              opacity={0.1}
            />
            <h2 className="sr-only">{t("qualityOfService.title")}</h2>
            <p className="uppercase tracking-[0.25em] opacity-95 font-bold py-8">
              {t("qualityOfService.intro")}
            </p>
            <div className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))]">
              <p className="block mb-8">{t("qualityOfService.desc1")}</p>
              <p className="block mb-8">{t("qualityOfService.desc2")}</p>
            </div>
          </div>
        </div>
      </section>
      {/** section repairMaintenance **/}

      <section
        className="relative container-gutter "
        aria-label="Services details section"
      >
        <BackgroundGrid />
        <div className="  grid grid-cols-12 py-12 lg:py-16">
          <h2 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-6 ">
            {t("repairMaintenance.title")}
          </h2>
          <p className="col-span-12 lg:col-span-3 lg:col-start-10 text-lg lg:text-xl text-muted-foreground text-justify whitespace-pre-line  max-w-2xl">
            {t.rich("repairMaintenance.intro", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </div>
        <div className="relative mb-8 lg:mb-16 border border-white/15">
          <BackgroundScanline
            crosshairs={["top-right", "bottom-left"]}
            className="absolute inset-0"
            opacity={0.1}
          />
          <MediaCard
            data={{
              route: `/${locale}/solutions`,
              title: t("repairMaintenance.items.item1.title"),
              description: t("repairMaintenance.items.item1.intro"),
              ogImage: t.raw("repairMaintenance.items.item1.imgSrc"),
              locale,
            }}
            variant="featured"
          />
        </div>
        <div className="grid grid-cols-12  mb-8 lg:mb-16 text-lg lg:text-xl leading-relaxed">
          <p className="col-span-12 lg:col-span-6 lg:col-start-4 text-justify">
            {t.rich("repairMaintenance.items.item1.desc1", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <p className="col-span-12 lg:col-span-6 lg:col-start-4 text-justify">
            {t.rich("repairMaintenance.items.item1.desc2", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </div>
        <div className="grid grid-cols-12 items-stretch ">
          {(["item2", "item3"] as const).map((key, i) => (
            <div
              className="col-span-12 lg:col-span-6 flex flex-col mb-16"
              key={i}
            >
              <MediaCard
                data={{
                  route: `/${locale}/solutions`,
                  title: t(`repairMaintenance.items.${key}.title`),
                  description: t(`repairMaintenance.items.${key}.intro`),
                  ogImage: t.raw(`repairMaintenance.items.${key}.imgSrc`),
                  locale,
                }}
                variant="compact"
              />

              <p className="mt-4 px-4 md:px-8">
                {t(`repairMaintenance.items.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-12  mb-8 lg:mb-16 ">
          <p className="col-span-12 lg:col-span-6 lg:col-start-4 text-xl lg:text-3xl">
            {t("repairMaintenance.ctaTitle")}
          </p>
          <Button
            className="col-span-12 lg:col-span-6 lg:col-start-4 min-h-20 my-8 bg-black text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
            href={`/${locale}/about#contactForm`}
          >
            {t("repairMaintenance.ctaLabel")}
          </Button>
        </div>
      </section>
      {/** section installation **/}
      <section
        className="relative container-gutter "
        aria-label="Services list section"
      >
        <BackgroundGrid />
        <div className="  grid grid-cols-12 py-16">
          <h2 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-6 ">
            {t("installation.title")}
          </h2>
          <p className="col-span-12 lg:col-span-3 lg:col-start-10 text-lg lg:text-xl text-muted-foreground text-justify whitespace-pre-line  max-w-2xl">
            {t.rich("installation.intro", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </div>
        <div className="relative grid grid-cols-12 bg-neutral-200 w-full h-full items-center justify-center border border-black/15 mb-8 lg:mb-16">
          <BackgroundScanline
            crosshairs={["top-right", "bottom-left"]}
            className="absolute inset-0 "
            opacity={0.1}
          />
          <div className="relative col-span-12 lg:col-span-6 aspect-[16/10] m-8 lg:m-12">
            <Image
              src="/images/services/wheelhouse-engineer-repairing.webp"
              alt={t("installation.items.item1.imgAlt")}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="col-span-12 lg:col-span-6 text-sm sm:text-lg lg:text-2xl px-8 lg:px-0 leading-relaxed">
            <h3 className="text-2xl lg:text-4xl font-bold mb-4">
              {t("installation.items.item1.title")}
            </h3>
            <p className="mb-4">{t("installation.items.item1.intro")}</p>
          </div>
        </div>
        <div className="grid grid-cols-12  mb-8 lg:mb-16 text-lg lg:text-xl leading-relaxed">
          <p className="col-span-12 lg:col-span-6 lg:col-start-4 ">
            {t.rich("installation.items.item1.desc", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
          <Button
            className="col-span-12 md:col-span-6 lg:col-start-4 min-h-20 my-8 bg-white text-black hover:bg-black hover:text-white border-t border-b border-neutral-500/20 focus:ring-white"
            href={`/${locale}/solutions`}
          >
            {t("installation.ctaLabel")}
          </Button>
        </div>
      </section>
    </>
  );
}
