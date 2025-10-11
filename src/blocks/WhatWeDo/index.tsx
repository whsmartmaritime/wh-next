import React from "react";
import { getMessages, getTranslations } from "next-intl/server";
import HoverHighlights from "@/components/HoverHighlights";
import Button from "@/components/Button";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import type {
  HoverHighlightsProps,
  HoverHighlightMedia,
} from "@/components/HoverHighlights";

interface WhatWeDoProps {
  className?: string;
}

export default async function WhatWeDo({}: WhatWeDoProps) {
  // Handle translations at this level
  const t = await getTranslations("home.whatWeDo");
  // Đọc cấu hình whatWeDo trực tiếp từ next-intl messages đã được load (RSC)
  const messages = await getMessages();
  type ImageEntry =
    | string
    | {
        src: string;
        alt?: string;
      };
  type WhatWeDoItem = {
    text: string;
    desc?: string;
    href: string;
    images: [ImageEntry, ImageEntry] | ImageEntry[]; // expecting 2 items, allow array and coerce below
  };

  type HomeMessages = {
    whatWeDo?: {
      title?: string;
      beforeHighlights?: string;
      afterHighlights?: string;
      items?: WhatWeDoItem[];
      primaryButton?: { label: string; href: string };
      secondaryButton?: { label: string; href: string };
    };
  };

  type RootMessages = {
    home?: {
      whatWeDo?: HomeMessages["whatWeDo"];
    };
  };

  const root = messages as unknown as RootMessages;
  const whatWeDo = root.home?.whatWeDo;
  const items: WhatWeDoItem[] = whatWeDo?.items ?? [];

  // Build clean data for HoverHighlights
  const highlightsData: HoverHighlightsProps = {
    beforeHighlights: t("beforeHighlights"),
    afterHighlights: t("afterHighlights"),
    highlights: items.map((item, index) => {
      // Coerce images to exactly two HoverHighlightMedia objects
      const arr = (Array.isArray(item.images) ? item.images : []).slice(0, 2);
      const [bg, fg] = (arr.length === 2 ? arr : ["", ""]) as [
        ImageEntry,
        ImageEntry
      ];

      const toMedia = (
        it: ImageEntry,
        fallbackAlt: string
      ): HoverHighlightMedia => {
        if (typeof it === "string") {
          return { src: it, alt: fallbackAlt, width: 600, height: 400 };
        }
        return {
          src: it?.src ?? "",
          alt: it?.alt ?? fallbackAlt,
          width: 600,
          height: 400,
        };
      };

      const mediaTuple: [HoverHighlightMedia, HoverHighlightMedia] = [
        toMedia(bg, `${item.text} Background`),
        toMedia(fg, `${item.text} Foreground`),
      ];

      return {
        id: `highlight-${index}`,
        text: (
          <h3 className="text-2xl lg:text-3xl xl:text-5xl font-bold m-0 leading-tight">
            {item.text}
          </h3>
        ),
        description: item.desc ?? undefined,
        href: item.href,
        newTab: false,
        images: mediaTuple,
      };
    }),
  };

  return (
    <section className="bg-gradient-to-br  from-gray-900 via-black/90 to-black relative overflow-hidden text-neutral-300">
      <BackgroundGrid />

      <div className="container-gutter grid grid-cols-12 before:hidden lg:before:block before:absolute before:inset-y-0 before:right-16 before:w-px before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent before:opacity-30 before:content-['']">
        <h2 className="col-span-12 text-2xl lg:text-3xl xl:text-4xl font-bold  text-left my-8">
          {t("title")}
        </h2>

        <div className="col-span-12">
          <HoverHighlights {...highlightsData} />
        </div>

        <Button
          className="col-span-12 md:col-span-6 lg:col-span-3 min-h-20 my-8 text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
          href={whatWeDo?.primaryButton?.href ?? t("buttonHref")}
        >
          {whatWeDo?.primaryButton?.label ?? t("buttonLabel")}
        </Button>

        {whatWeDo?.secondaryButton ? (
          <Button
            className="col-span-12 md:col-span-6 lg:col-span-3 min-h-20 my-8 text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
            href={whatWeDo.secondaryButton.href}
          >
            {whatWeDo.secondaryButton.label}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
