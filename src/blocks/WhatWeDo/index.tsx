import React from "react";
import { getMessages, getTranslations } from "next-intl/server";
import Highlights from "@/components/Highlights";
import Button from "@/components/Button";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import type { HighlightItem } from "@/components/Highlights";

interface keyOfferingsProps {
  className?: string;
}

export default async function keyOfferings({}: keyOfferingsProps) {
  // Handle translations at this level
  const t = await getTranslations("home.keyOfferings");
  // Đọc cấu hình keyOfferings trực tiếp từ next-intl messages đã được load (RSC)
  const messages = await getMessages();
  type ImageEntry =
    | string
    | {
        src: string;
        alt?: string;
      };
  type keyOfferingsItem = {
    text: string;
    desc?: string;
    href: string;
    images: [ImageEntry, ImageEntry] | ImageEntry[]; // expecting 2 items, allow array and coerce below
  };

  type HomeMessages = {
    keyOfferings?: {
      title?: string;
      lead?: string;
      closing?: string;
      items?: keyOfferingsItem[];
      primaryButton?: { label: string; href: string };
      secondaryButton?: { label: string; href: string };
    };
  };

  type RootMessages = {
    home?: {
      keyOfferings?: HomeMessages["keyOfferings"];
    };
  };

  const root = messages as unknown as RootMessages;
  const keyOfferings = root.home?.keyOfferings;
  const items: keyOfferingsItem[] = keyOfferings?.items ?? [];

  // Build data for simplified Highlights component
  const highlightItems: HighlightItem[] = items.map((item) => {
    const arr = (Array.isArray(item.images) ? item.images : []).slice(0, 2);
    const [bg, fg] = (arr.length === 2 ? arr : ["", ""]) as [
      ImageEntry,
      ImageEntry
    ];

    const normalize = (it: ImageEntry, fallback: string) =>
      typeof it === "string"
        ? { src: it, alt: fallback }
        : { src: it?.src ?? "", alt: it?.alt ?? fallback };

    return {
      text: item.text,
      href: item.href,
      images: [
        normalize(bg, `${item.text} Background`),
        normalize(fg, `${item.text} Foreground`),
      ],
    };
  });

  return (
    <section className="bg-gradient-to-br  from-gray-900 via-black/90 to-black relative overflow-hidden text-neutral-300">
      <BackgroundGrid />

      <div className="container-gutter grid grid-cols-12 before:hidden lg:before:block before:absolute before:inset-y-0 before:right-16 before:w-px before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent before:opacity-30 before:content-['']">
        <h2 className="col-span-12 text-2xl lg:text-3xl xl:text-4xl font-bold  text-left my-8">
          {t("title")}
        </h2>

        <div className="col-span-12">
          <Highlights
            lead={<h3>{t("lead")}</h3>}
            closing={<h3>{t("closing")}</h3>}
            items={highlightItems}
          />
        </div>

        <Button
          className="col-span-12 md:col-span-6 lg:col-span-3 min-h-20 my-8 text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
          href={keyOfferings?.primaryButton?.href ?? t("buttonHref")}
        >
          {keyOfferings?.primaryButton?.label ?? t("buttonLabel")}
        </Button>

        {keyOfferings?.secondaryButton ? (
          <Button
            className="col-span-12 md:col-span-6 lg:col-span-3 min-h-20 my-8 text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
            href={keyOfferings.secondaryButton.href}
          >
            {keyOfferings.secondaryButton.label}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
