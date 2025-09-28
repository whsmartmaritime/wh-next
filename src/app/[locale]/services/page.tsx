import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/generate-page-metadata";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import BackgroundScanline from "@/components/BackgroundScanline";
import BackgroundGrid from "@/components/BackgroundGrid";
import Image from "next/image";
import Button from "@/components/Button";
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return generatePageMetadata(locale, "services", {
    robots: { index: false, follow: false },
  });
}

export default async function ServicePage(props: {
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

      <section
        className="relative bg-neutral-200 text-neutral-900"
        aria-label="Services intro section"
      >
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
        className="relative container-gutter dark bg-black text-neutral-200"
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
        <div className="relative grid grid-cols-12 bg-black w-full h-full items-center justify-center border border-white/15 mb-8 lg:mb-16">
          <BackgroundScanline
            crosshairs={["top-right", "bottom-left"]}
            className="absolute inset-0 "
            opacity={0.1}
          />
          <div className="relative col-span-12 lg:col-span-6 aspect-[16/10] m-8 lg:m-12">
            <Image
              src={t("repairMaintenance.items.item1.imgSrc")}
              alt={t("repairMaintenance.items.item1.imgAlt")}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="col-span-12 lg:col-span-6 text-sm sm:text-lg lg:text-2xl px-8 lg:px-0 text-justify leading-relaxed">
            <h3 className="text-2xl lg:text-4xl font-bold mb-4">
              {t("repairMaintenance.items.item1.title")}
            </h3>
            <p className="mb-4">{t("repairMaintenance.items.item1.intro")}</p>
          </div>
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
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="relative w-full md:w-1/2 aspect-[16/10]">
                  <Image
                    src={t.raw(`repairMaintenance.items.${key}.imgSrc`)}
                    alt={t(`repairMaintenance.items.${key}.imgAlt`)}
                    width={1600}
                    height={1000}
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 ">
                  <h3 className="text-xl lg:text-2xl font-bold m-4">
                    {t(`repairMaintenance.items.${key}.title`)}
                  </h3>
                  <p className="text-lg lg:text-xl  m-4">
                    {t(`repairMaintenance.items.${key}.intro`)}
                  </p>
                </div>
              </div>

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
        className="relative container-gutter bg-neutral-200 text-neutral-900"
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
