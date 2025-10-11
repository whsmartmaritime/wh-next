import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import ArrowIcon from "@/components/icons/ArrowIcon";

export type HighlightMedia = {
  src: string;
  alt: string;
};

export type HighlightItem = {
  title: ReactNode;
  href: string;
  images: { bg: HighlightMedia; fg: HighlightMedia };
};

export type HighlightsProps = {
  title?: ReactNode;
  lead?: ReactNode;
  closing?: ReactNode;
  items: HighlightItem[];
  className?: string;
};

// Server component: pure markup + Tailwind hover effects (no client state)
export default function Highlights({
  title,
  lead,
  closing,
  items,
  className = "",
}: HighlightsProps) {
  const safeItems: HighlightItem[] = items ?? [];

  return (
    <div className={` h-full min-h-[50vh] ${className}`}>
      <div className="col-span-12 text-2xl lg:text-3xl xl:text-4xl font-bold  text-left my-8">
        {title}
      </div>
      <div className="relative grid grid-cols-12">
        {/* Text & links */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center md:pr-16 z-10">
          {lead ? (
            <p className="text-lg lg:text-xl mb-4 max-w-2xl">{lead}</p>
          ) : null}

          <div className="group/allkeys flex flex-col">
            {safeItems.map((item, idx) => (
              <div key={idx} className="group/key py-4">
                <Link
                  href={item.href}
                  className="flex items-center gap-4 text-2xl lg:text-4xl xl:text-6xl font-bold transition-colors duration-1000 text-neutral-600 hover:text-neutral-100 md:max-w-full"
                >
                  {item.title}
                  <ArrowIcon
                    size="large"
                    className="ml-3 opacity-0 transition-all duration-1000 group-hover/key:opacity-100"
                  />
                </Link>

                {/* Background image for this item (shows on group hover) */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 h-full pointer-events-none ">
                  <div className="relative w-full aspect-[16/9]  transform opacity-100 group-hover/allkeys:opacity-0 group-hover/key:opacity-100 transition-all duration-700 ease-in-out ">
                    <Image
                      src={item.images.bg.src}
                      alt={item.images.bg.alt}
                      fill
                      className="object-cover transform translate-y-10 group-hover/key:translate-y-0 transition-all duration-800 ease-in-out delay-200"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />

                    {/* Foreground image */}

                    <Image
                      src={item.images.fg.src}
                      alt={item.images.fg.alt}
                      fill
                      className="object-cover  transform translate-y-30 group-hover/key:translate-y-20 translate-x-20 opacity-100 group-hover/allkeys:opacity-0 group-hover/key:opacity-100 transition-all duration-800 ease-in-out delay-400 z-10"
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
      </div>
    </div>
  );
}
