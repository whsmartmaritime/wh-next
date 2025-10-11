import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowIcon from "@/components/icons/ArrowIcon";

export type HighlightMedia = {
  src: string;
  alt: string;
};

export type HighlightItem = {
  text: string;
  href: string;
  images: [HighlightMedia, HighlightMedia];
};

export type HighlightsProps = {
  lead?: string;
  closing?: string;
  items: HighlightItem[];
  className?: string;
};

// Server component: pure markup + Tailwind hover effects (no client state)
export default function Highlights({
  lead,
  closing,
  items,
  className = "",
}: HighlightsProps) {
  return (
    <div
      className={`relative grid grid-cols-12 h-full min-h-[50vh] ${className}`}
    >
      {/* Text & links */}
      <div className="col-span-12 md:col-span-6 flex flex-col justify-center md:pr-16 z-10">
        {/* Default/base image shown when no item is hovered */}
        {items[0] ? (
          <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none">
            <div className="absolute inset-0 aspect-[16/10] opacity-60">
              <Image
                src={items[0].images[0].src}
                alt={items[0].images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute top-20 left-30 right-10 bottom-10 aspect-[16/10] opacity-100 z-0">
              <Image
                src={items[0].images[1].src}
                alt={items[0].images[1].alt}
                fill
                className="object-cover shadow-2xl"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        ) : null}
        {lead ? (
          <p className="text-lg lg:text-xl mb-4 max-w-2xl">{lead}</p>
        ) : null}

        <div className="flex flex-col">
          {items.map((item, idx) => (
            <div key={idx} className="group py-4">
              <Link
                href={item.href}
                className="flex items-center gap-4 text-2xl lg:text-4xl xl:text-6xl font-bold transition-colors duration-1000 text-neutral-600 hover:text-neutral-100 md:max-w-full"
              >
                {item.text}
                <ArrowIcon
                  size="large"
                  className="ml-3 opacity-0 transition-all duration-1000 group-hover:opacity-100"
                />
              </Link>

              {/* Background image for this item (shows on group hover) */}
              <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none">
                <div className="absolute inset-0 aspect-[16/10] opacity-0 group-hover:opacity-60 transition-all duration-700 ease-out transform scale-105 group-hover:scale-100">
                  <Image
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                </div>

                {/* Foreground image */}
                <div className="absolute top-20 left-30 right-10 bottom-10 aspect-[16/10] opacity-0 transform translate-y-4 translate-x-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-700 ease-out delay-200 z-10">
                  <Image
                    src={item.images[1].src}
                    alt={item.images[1].alt}
                    fill
                    className="object-cover shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority={idx === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {closing ? (
          <p className="text-lg lg:text-xl text-muted-foreground mt-8 max-w-2xl">
            {closing}
          </p>
        ) : null}
      </div>

      {/* Right column placeholder for layout balance on small tweaks (images already occupy right half absolutely) */}
      <div className="hidden md:block col-span-6" />
    </div>
  );
}
