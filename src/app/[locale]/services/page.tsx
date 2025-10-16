import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import BackgroundScanline from "@/components/BackgroundScanline";
import BackgroundGrid from "@/components/BackgroundGrid";
import BgGrid from "@/components/BgGrid";
import Button from "@/components/Button";
import MediaCard from "@/components/MediaCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { HeroPage } from "@/components/Hero/HeroPage";

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
        className="relative container-gutter mt-16 lg:mt-32"
        aria-label="Services hero section"
      >
        <BgGrid className="fixed" />
        <HeroPage
          title={<h1>{t("hero.title")}</h1>}
          subtitle={
            <p>
              {t.rich("hero.subtitle", {
                bold: (chunks) => (
                  <strong className="font-bold">{chunks}</strong>
                ),
              })}
            </p>
          }
          cardTitle={<p>{t("hero.cardTitle")}</p>}
          cardDescription={<p>{t("hero.cardDescription")}</p>}
          className="container-gutter"
          cardImgSrc={t("hero.imgSrc")}
          cardImgAlt={t("hero.imgAlt")}
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
              label: locale === "vi" ? "Dịch vụ" : "Services",
            },
          ]}
        />
      </div>
      {/** section qualityOfService **/}

      <section className="relative " aria-label="Quality of service section">
        <BackgroundGrid />
        <div className="container-gutter py-16 lg:py-32">
          <div className="relative flex flex-col gap-8 bg-neutral-200 w-full h-full border border-neutral-500/20 pb-16 ">
            <BackgroundScanline crosshairs="all" opacity={0.1} />
            <h2 className="uppercase tracking-[0.25em] opacity-95 font-bold mt-8">
              {t("qualityOfService.title")}
            </h2>
            <div className="flex flex-col gap-8 mx-[calc(var(--gutter-h))] ">
              {t
                .raw("qualityOfService.description")
                .flat()
                .map((_: unknown, i: number) => (
                  <p
                    key={i}
                    className="block text-sm sm:text-lg lg:text-3xl text-justify "
                  >
                    {t.rich(`qualityOfService.description.${i}`, {
                      bold: (chunks) => (
                        <strong className="font-bold">{chunks}</strong>
                      ),
                    })}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/** section repairMaintenance **/}
      <section
        id="repair-maintenance"
        className="relative container-gutter scroll-mt-16"
        aria-label="Repair and Maintenance Services section"
      >
        <BackgroundGrid />
        <div className="  grid grid-cols-12 py-12 lg:py-16">
          <h2 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-6 ">
            {t("repairMaintenance.title")}
          </h2>
          <p className="col-span-12 lg:col-span-3 lg:col-start-10 text-lg lg:text-xl text-justify whitespace-pre-line  max-w-2xl">
            {t.rich("repairMaintenance.subtitle", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </div>
        <MediaCard
          className=" mb-8 lg:mb-16"
          data={{
            title: t("repairMaintenance.items.item1.title"),
            description: t("repairMaintenance.items.item1.description"),
            imgSrc: t.raw("repairMaintenance.items.item1.imgSrc"),
            imgAlt: t("repairMaintenance.items.item1.imgAlt"),
          }}
          variant="featured"
        />
        <div className="grid grid-cols-12  mb-8 lg:mb-16 text-lg lg:text-xl leading-relaxed">
          {[t.raw("repairMaintenance.items.item1.details")]
            .flat()
            .map((_, i: number) => (
              <p
                key={i}
                className="col-span-12 lg:col-span-6 lg:col-start-4 text-justify"
              >
                {t.rich(`repairMaintenance.items.item1.details.${i}`, {
                  bold: (chunks) => (
                    <strong className="font-bold">{chunks}</strong>
                  ),
                })}
              </p>
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch mb-8 lg:mb-16">
          {(["item2", "item3"] as const).map((key, i) => (
            <MediaCard
              key={i}
              data={{
                title: t(`repairMaintenance.items.${key}.title`),
                description: t(`repairMaintenance.items.${key}.description`),
                imgSrc: t.raw(`repairMaintenance.items.${key}.imgSrc`),
                imgAlt: t(`repairMaintenance.items.${key}.imgAlt`),
              }}
              variant="compact"
            />
          ))}
        </div>
        <div className="grid grid-cols-12  mb-8 lg:mb-16 ">
          <p className="col-span-12 lg:col-span-6 lg:col-start-4 text-xl lg:text-3xl">
            {t("repairMaintenance.ctaContent.title")}
          </p>
          <Button
            className="col-span-12 lg:col-span-6 lg:col-start-4 min-h-20 my-8 bg-black text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
            href={`/about#contactForm`}
          >
            {t("repairMaintenance.ctaContent.label")}
          </Button>
        </div>
      </section>

      {/** section installation **/}
      <section
        id="installation"
        className="relative container-gutter scroll-mt-16"
        aria-label="Installation Services section"
      >
        <BackgroundGrid />
        <div className="  grid grid-cols-12 py-12 lg:py-16">
          <h2 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-6 ">
            {t("installation.title")}
          </h2>
          <p className="col-span-12 lg:col-span-3 lg:col-start-10 text-lg lg:text-xl text-justify whitespace-pre-line  max-w-2xl">
            {t.rich("installation.subtitle", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </div>
        <MediaCard
          className=" mb-8 lg:mb-16"
          data={{
            href: `/${locale}/solutions`,
            title: t("installation.items.item1.title"),
            description: t("installation.items.item1.description"),
            imgSrc: t.raw("installation.items.item1.imgSrc"),
            imgAlt: t("installation.items.item1.imgAlt"),
          }}
          variant="featured"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch mb-8 lg:mb-16">
          {(["item2", "item3"] as const).map((key, i) => (
            <MediaCard
              key={i}
              data={{
                title: t(`installation.items.${key}.title`),
                description: t(`installation.items.${key}.description`),
                imgSrc: t.raw(`installation.items.${key}.imgSrc`),
                imgAlt: t(`installation.items.${key}.imgAlt`),
              }}
              variant="compact"
            />
          ))}
        </div>
        <div className="grid grid-cols-12  mb-8 lg:mb-16 ">
          <p className="col-span-12 lg:col-span-6 lg:col-start-4 text-xl lg:text-3xl">
            {t("ctaContent.description")}
          </p>
          <Button
            className="col-span-12 lg:col-span-6 lg:col-start-4 min-h-20 my-8 bg-black text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
            href={`/solutions`}
          >
            {t("ctaContent.label")}
          </Button>
        </div>
      </section>
    </>
  );
}
