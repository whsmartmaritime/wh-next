import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import Image from "next/image";
import Link from "next/dist/client/link";
import Button from "@/components/Button";
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  // Parallel translation loading for better performance
  const translations = await Promise.all(
    routing.locales.map((l) =>
      getTranslations({ locale: l, namespace: "solutions" })
    )
  );

  const currentIndex = routing.locales.indexOf(locale as "en" | "vi");
  const t = translations[currentIndex];

  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");
  const canonical = t("meta.canonical");

  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );
  const url = new URL(canonical, base);

  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l, index) => [
      l,
      new URL(translations[index]("meta.canonical"), base),
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
    robots: { index: false, follow: false }, // Ngăn bot index trang này
  };
}

export default async function SolutionsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "solutions" });

  return (
    <>
      <section className=" bg-gradient-to-br from-sky-900 via-slate-900 to-black w-full text-neutral-300">
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
      {/** section overview **/}

      <section className="relative bg-neutral-200 text-neutral-900">
        <BackgroundGrid />
        <div className="container-gutter py-16 lg:py-32">
          <div className="relative bg-neutral-200 w-full h-full items-center justify-center  border border-neutral-500/20 pb-16">
            <BackgroundScanline
              crosshairs="all"
              className="absolute inset-0 "
              opacity={0.1}
            />
            <h2 className="sr-only">{t("overview.title")}</h2>
            <p className="uppercase tracking-[0.25em] opacity-95 font-bold py-8">
              {t("overview.intro")}
            </p>
            <div className="text-sm sm:text-lg lg:text-4xl text-justify mx-[calc(var(--gutter-h))]">
              <p className="block mb-8">{t("overview.desc")}</p>
            </div>
          </div>
        </div>
      </section>
      {/* solution list section */}
      <section className="relative container-gutter bg-neutral-200 text-neutral-900">
        <BackgroundGrid />
        <div className="grid grid-cols-12 items-stretch">
          {(["item1", "item2", "item3", "item4"] as const).map((key, i) => (
            <div
              className="col-span-12 lg:col-span-6 flex flex-col mb-16"
              key={i}
            >
              <Link
                href={t(`solutionList.items.${key}.href`)}
                className="group block relative overflow-hidden transition-all duration-500"
              >
                {/* Component scanline - ẩn mặc định, hiện khi hover */}
                <BackgroundScanline
                  crosshairs="all"
                  className="absolute inset-0 boder boder-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 "
                  opacity={0.1}
                />

                {/* Nội dung card */}
                <div className="flex flex-col md:flex-row relative z-10">
                  <div className="relative w-full md:w-1/2 aspect-[16/10]">
                    <Image
                      src={t.raw(`solutionList.items.${key}.imgSrc`)}
                      alt={t(`solutionList.items.${key}.imgAlt`)}
                      width={1600}
                      height={1000}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 group-hover:border group-hover:border-neutral-500/20 group-hover:border-b-neutral-700">
                    <h2 className="text-xl xl:text-2xl font-bold mx-4 mt-4">
                      {t(`solutionList.items.${key}.title`)}
                    </h2>
                    <p className="text-lg xl:text-xl line-clamp-4 m-4">
                      {t(`solutionList.items.${key}.intro`)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div className="col-span-12 lg:col-span-6 lg:col-start-4 my-auto mx-auto ">
            <h2 className="text-2xl lg:text-4xl font-bold ">
              {t("solutionList.ctaContent.title")}
            </h2>
            <p className=" ">
              {t.rich("solutionList.ctaContent.desc", {
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
