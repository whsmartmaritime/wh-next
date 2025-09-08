import React from "react";
import { getTranslations } from "next-intl/server";
import HoverHighlights from "@/components/HoverHighlights";
import Button from "@/components/Button";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import BackgroundScanline from "@/components/BackgroundScanline";
import type { HoverHighlightsProps } from "@/components/HoverHighlights";

// Maritime solutions images (all in /images/whatwedo/)
const MARITIME_IMAGES = [
  ["navigation-gmdss.jpg", "navigation-gmdss2.jpg"],
  ["connectivity.jpg", "connectivity2.jpg"],
  ["repair-maintenance.jpg", "repair-maintenance2.jpg"],
  ["e-navigation.jpg", "e-navigation2.jpg"],
  ["annual-survey.jpg", "annual-survey2.jpg"],
] as const;

interface WhatWeDoProps {
  className?: string;
}

export default async function WhatWeDo({}: WhatWeDoProps) {
  // Handle translations at this level
  const t = await getTranslations("home.whatWeDo");

  // Build clean data for HoverHighlights
  const highlightsData: HoverHighlightsProps = {
    beforeHighlights: t("beforeHighlights"),
    afterHighlights: t("afterHighlights"),
    highlights: MARITIME_IMAGES.map((images, index) => ({
      id: `highlight-${index}`, // Simple ID for React key
      text: (
        <h3 className="text-2xl lg:text-3xl xl:text-5xl font-bold m-0 leading-tight">
          {t(`highlight${index + 1}Text`)}
        </h3>
      ),
      description: t(`highlight${index + 1}Desc`),
      href: t(`highlight${index + 1}Href`), // From JSON - supports i18n
      newTab: false,
      images: [
        {
          src: `/images/whatwedo/${images[0]}`,
          alt: `${t(`highlight${index + 1}Text`)} System`,
          width: 600,
          height: 400,
        },
        {
          src: `/images/whatwedo/${images[1]}`,
          alt: `${t(`highlight${index + 1}Text`)} Interface`,
          width: 600,
          height: 400,
        },
      ],
    })),
    // Remove cta from here - will handle in WhatWeDo component directly
  };

  return (
    <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-black dark:from-gray-900 dark:via-black/90 dark:to-black relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundGrid />
      <BackgroundScanline />
      <div className="container-gutter grid grid-cols-12 before:hidden lg:before:block before:absolute before:inset-y-0 before:right-16 before:w-px before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent before:opacity-30 before:content-['']">
        {/* Section Title */}
        <h2 className="col-span-12 text-2xl lg:text-3xl xl:text-4xl font-bold  text-center lg:text-left my-8">
          {t("title")}
        </h2>

        {/* Interactive Highlights */}
        <div className="col-span-12">
          <HoverHighlights {...highlightsData} />
        </div>

        {/* Call to Action */}
        <Button
          className="col-span-12 md:col-span-6 lg:col-span-3 min-h-20 my-8 text-white hover:bg-white hover:text-black border-t border-b border-white/20 focus:ring-white"
          href={t("buttonHref")}
        >
          {t("buttonLabel")}
        </Button>
      </div>
    </section>
  );
}
