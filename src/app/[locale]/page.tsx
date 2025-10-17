import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import BgGrid from "@/components/BgGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import Hero from "@/components/Hero";
import LogoShowcase from "@/components/LogoShowcase";
import Slider from "@/components/Slider";
import Highlights from "@/components/Highlights";
import MediaCard from "@/components/MediaCard";
import { entries, featureEntry, type Locales } from "@/lib/postIndex.generated";
import Button from "@/components/Button";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "home" });
  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");

  const base = new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  );

  const url = new URL(`${locale}`, base);

  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
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

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "home" });
  const l = locale as Locales;
  const all = entries[l] || [];
  const feature = featureEntry[l] ?? null;
  const list = all.slice(0, 2);
  return (
    <>
      <section
        className="relative w-full min-h-screen text-neutral-200"
        aria-label="Hero section"
      >
        <BackgroundGrid gradient={true} />
        <BackgroundAnimation />
        <div className="relative container-gutter">
          <Hero
            className="pt-20 pb-16 lg:pt-32 lg:pb-24 mb-8"
            isHome={true}
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

          <div className="relative  text-center ">
            <p className="text-sm uppercase tracking-widest font-medium mb-8 ">
              {t("hero.partnerShowcase", {
                defaultValue: "Partners and Customers",
              })}
            </p>
            <LogoShowcase
              className="pb-16"
              logos={[
                { id: "1", src: "/images/logos/partnerLogo1.png" },
                { id: "2", src: "/images/logos/partnerLogo2.png" },
                { id: "3", src: "/images/logos/partnerLogo3.png" },
                { id: "4", src: "/images/logos/partnerLogo4.png" },
                { id: "5", src: "/images/logos/partnerLogo5.png" },
                { id: "6", src: "/images/logos/partnerLogo6.png" },
                { id: "7", src: "/images/logos/partnerLogo7.png" },
                { id: "8", src: "/images/logos/partnerLogo8.png" },
                { id: "9", src: "/images/logos/partnerLogo9.png" },
                { id: "20", src: "/images/logos/partnerLogo20.jpg" },
                { id: "21", src: "/images/logos/partnerLogo21.jpg" },
                { id: "22", src: "/images/logos/partnerLogo22.jpg" },
              ]}
            />
          </div>
        </div>
      </section>

      <section
        aria-label="Our Purpose section"
        className="relative container-gutter py-16 lg:py-32"
      >
        <BgGrid />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 h-full border border-neutral-900/20 bg-neutral-50 ">
          <BackgroundScanline />

          <div className={"flex flex-col justify-center "}>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold mb-8">
              {t("ourPurpose.title")}
            </h2>
            <p className="text-md xl:text-xl text-justify whitespace-pre-line mb-8">
              {t("ourPurpose.description")}
            </p>
          </div>
          <div className={"relative aspect-[16/9] m-8 lg:m-12"}>
            <Slider
              aspectRatio="16/9"
              images={t.raw("ourPurpose.images")}
              className="col-span-12 lg:col-span-6 shadow-lg"
            />
          </div>
        </div>
      </section>
      <section
        className="relative overflow-hidden"
        aria-label="why clients choose wheelhouse section"
      >
        <BgGrid />
        <div className="container-gutter">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-8">
            {t("keyValues.title")}
          </h2>
          <p className="text-md xl:text-xl  text-justify whitespace-pre-line mb-8 max-w-2xl">
            {t("keyValues.description")}
          </p>
        </div>
        <div className="relative mb-8 lg:mb-16">
          <BackgroundScanline enableBorders={true} />
          <div className="container-gutter grid grid-cols-12">
            {t
              .raw("keyValues.items")
              .map(
                (
                  item: { title: string; description: string },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="col-span-12 md:col-span-6 lg:col-span-3 bg-neutral-50 hover:bg-transparent  transition-colors duration-300  border border-neutral-500/20 z-10"
                  >
                    <p className="text-sm lg:text-base  leading-relaxed  m-4 lg:m-8">
                      {"0" + (index + 1)}
                    </p>
                    <h3 className="text-xl lg:text-2xl font-semibold m-4 lg:m-8 uppercase ">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base  leading-relaxed  m-4 lg:m-8">
                      {item.description}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>
        <div className="container-gutter relative grid grid-cols-12">
          <Button
            className="col-span-12 md:col-span-6 lg:col-span-3 min-h-20 mb-8 hover:bg-black hover:text-white border-t border-b border-neutral-500/20 focus:ring-white"
            href="/about"
          >
            {t("keyValues.ctaPrimary")}
          </Button>
        </div>
      </section>

      {/* key offerings section (inlined) */}
      <section
        className="bg-gradient-to-br pt-16 from-gray-900 via-black/90 to-black relative overflow-hidden text-neutral-300"
        aria-label="key offerings section"
      >
        <BackgroundGrid />
        <div className="container-gutter grid grid-cols-12 before:hidden lg:before:block before:absolute before:inset-y-0 before:right-16 before:w-px before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent before:opacity-30 before:content-['']">
          <div className="col-span-12 mb-4 lg:mb-8">
            <Highlights
              title={<h2>{t("keyOfferings.title")}</h2>}
              lead={t("keyOfferings.lead")}
              closing={t("keyOfferings.closing")}
              items={
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (t as any).raw?.("keyOfferings.items")?.map((it: any) => ({
                  title: <h3>{it.title}</h3>,
                  href: it.href,
                  images: it.images,
                })) ?? []
              }
            />
          </div>
          <div className="col-span-12 lg:col-span-6 justify-center ">
            <Button
              className=" w-full md:w-1/2 min-h-20  text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
              href={t("keyOfferings.primaryButton.href")}
            >
              {t("keyOfferings.primaryButton.label")}
            </Button>

            <Button
              className=" w-full md:w-1/2 min-h-20 text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white mb-4 lg:mb-8"
              href={t("keyOfferings.secondaryButton.href")}
            >
              {t("keyOfferings.secondaryButton.label")}
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Articles section */}
      <section
        className="relative container-gutter py-16"
        aria-label="Recent Articles section"
      >
        <BackgroundGrid />

        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">
            {t("recentArticles.title", { defaultValue: "Recent Articles" })}
          </h2>
        </div>
        <article className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
          {feature ? (
            <MediaCard
              className="col-span-1 md:col-span-2"
              data={{
                href: feature.route,
                title: feature.title,
                description: [feature.publishedAt, feature.author]
                  .filter(Boolean)
                  .join(" • "),
                imgSrc: feature.ogImage,
                imgAlt: feature.title ?? "Article image",
              }}
              variant="featured"
            />
          ) : null}
          {list.map((p) => (
            <MediaCard
              key={p.route}
              data={{
                href: p.route,
                title: p.title,
                description: [p.publishedAt, p.author]
                  .filter(Boolean)
                  .join(" • "),
                imgSrc: p.ogImage,
                imgAlt: p.title ?? "Article image",
              }}
              variant="compact"
            />
          ))}
        </article>
      </section>
    </>
  );
}
