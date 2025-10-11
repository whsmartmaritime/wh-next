import React from "react";
import { getTranslations } from "next-intl/server";
import Highlights from "@/components/Highlights";
import type { HighlightItem } from "@/components/Highlights";
import Button from "@/components/Button";
import { BackgroundGrid } from "@/components/BackgroundGrid";

interface keyOfferingsProps {
  className?: string;
}

export default async function keyOfferings({}: keyOfferingsProps) {
  // KISS: Dùng getTranslations và t.raw để lấy items; ép kiểu tối thiểu, không kiểm tra runtime
  const t = await getTranslations("home.keyOfferings");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = (t as any).raw ? (t as any).raw("items") : [];
  const items = (
    raw as Array<{
      title: string;
      href: string;
      images: {
        bg: { src: string; alt: string };
        fg: { src: string; alt: string };
      };
    }>
  ).map((it) => ({
    title: <h3>{it.title}</h3>,
    href: it.href,
    images: it.images,
  })) as HighlightItem[];

  return (
    <section className="bg-gradient-to-br  from-gray-900 via-black/90 to-black relative overflow-hidden text-neutral-300">
      <BackgroundGrid />

      <div className="container-gutter grid grid-cols-12 before:hidden lg:before:block before:absolute before:inset-y-0 before:right-16 before:w-px before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent before:opacity-30 before:content-['']">
        <div className="col-span-12 mb-4 lg:mb-8">
          <Highlights
            title={<h2>{t("title")}</h2>}
            lead={t("lead")}
            closing={t("closing")}
            items={items}
          />
        </div>
        <div className="col-span-12 lg:col-span-6 justify-center ">
          <Button
            className=" w-full md:w-1/2 min-h-20  text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white"
            href={t("primaryButton.href")}
          >
            {t("primaryButton.label")}
          </Button>

          <Button
            className=" w-full md:w-1/2 min-h-20 text-white hover:bg-white hover:text-black border-t border-b border-neutral-500/20 focus:ring-white mb-4 lg:mb-8"
            href={t("secondaryButton.href")}
          >
            {t("secondaryButton.label")}
          </Button>
        </div>
      </div>
    </section>
  );
}
