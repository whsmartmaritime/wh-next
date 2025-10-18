import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import BackgroundScanline from "@/components/BackgroundScanline";
import BgGrid from "@/components/BgGrid";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollShowcase from "@/components/ScrollShowcase";

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
      <section className="relative" aria-label="Services hero section">
        <div className="container-gutter ">
          <BgGrid className="fixed" />
          <Hero
            title={
              <h1>
                {t.rich("hero.title", {
                  highlight: (chunk) => (
                    <span className="text-sky-700">{chunk}</span>
                  ),
                })}
              </h1>
            }
            subtitle={<h2>{t("hero.subtitle")}</h2>}
            images={t.raw("hero.images")}
            ctas={t.raw("hero.ctas")}
          />
        </div>
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
        <div className="container-gutter">
          <div className="relative flex flex-col gap-8 bg-neutral-200 w-full h-full border border-neutral-500/20 mt-16 pb-16 ">
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
                      b: (chunks) => (
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
        className="relative scroll-mt-16 mt-16"
        aria-label="Repair and Maintenance Services section"
      >
        <div className="container-gutter flex flex-col gap-8">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6 lg:col-start-4 flex flex-col gap-8">
              <h2 className="text-4xl lg:text-6xl font-bold">
                {t("rm.title")}
              </h2>
              {[t.raw("rm.details")].flat().map((_, i: number) => (
                <p
                  key={i}
                  className=" text-justify text-sm sm:text-lg lg:text-2xl"
                >
                  {t.rich(`rm.details.${i}`, {
                    b: (chunks) => (
                      <strong className="font-bold">{chunks}</strong>
                    ),
                  })}
                </p>
              ))}
            </div>
          </div>
          <ScrollShowcase
            items={(
              t.raw("rm.items") as Array<{
                title: string;
                description: string[];
                image: { src: string; alt: string };
              }>
            ).map((item) => ({
              title: <h3>{item.title}</h3>,
              description: item.description.map(
                (desc: string, descIndex: number) => (
                  <p
                    key={descIndex}
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                )
              ),
              image: { src: item.image.src, alt: item.image.alt },
            }))}
          />
          <div className="grid grid-cols-12 ">
            <p className="col-span-12 lg:col-span-6 lg:col-start-4 text-xl lg:text-3xl">
              {t("rm.ctaContent.title")}
            </p>
            <Button
              className="col-span-12 lg:col-span-6 lg:col-start-4 min-h-20 my-8 bg-black text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
              href={`/about#contactForm`}
            >
              {t("rm.ctaContent.label")}
            </Button>
          </div>
        </div>
      </section>

      {/** section installation **/}
      <section
        id="installation"
        className="relative container-gutter scroll-mt-16"
        aria-label="Installation Services section"
      >
        <div className="  grid grid-cols-12 py-12 lg:py-16">
          <h2 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-6 ">
            {t("rm.title")}
          </h2>
          <p className="col-span-12 lg:col-span-3 lg:col-start-10 text-lg lg:text-xl text-justify whitespace-pre-line  max-w-2xl">
            {t.rich("installation.subtitle", {
              b: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
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
