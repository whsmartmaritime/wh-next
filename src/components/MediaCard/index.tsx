import Image from "next/image";
import Link from "next/link";
import { BackgroundScanline } from "../BackgroundScanline";

export type MediaCardData = {
  href?: string; // optional href; if absent, card is non-clickable
  title?: string;
  description?: string;
  imgSrc?: string;
  imgAlt?: string;
};

export type MediaCardProps = {
  data: MediaCardData;
  className?: string;
  variant?: "featured" | "compact";
};

export default function MediaCard({
  data,
  className = "",
  variant = "compact",
}: MediaCardProps) {
  const isFeatured = variant === "featured";

  return (
    <div className={"relative block h-full group " + className}>
      <div className="relative grid grid-cols-1 h-full bg-neutral-50 group-hover:bg-neutral-100 before:content-[''] before:block before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-left before:scale-x-0 before:bg-neutral-900 before:transition-transform before:duration-1000 group-hover:before:scale-x-100 lg:grid-cols-2">
        <BackgroundScanline
          crosshairs={["top-right", "bottom-left"]}
          enableBorders={true}
          className={
            "absolute inset-0  group-hover:opacity-100 transition-transform " +
            (isFeatured ? "opacity-100" : "opacity-0")
          }
        />
        {data.imgSrc ? (
          <div
            className={
              "relative aspect-[16/9] " + (isFeatured ? "m-8 lg:m-12" : "")
            }
          >
            <Image
              src={data.imgSrc}
              alt={data.imgAlt || "Media image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover border border-neutral-500/20"
              priority={isFeatured}
            />
          </div>
        ) : null}
        <div
          className={
            "flex flex-col justify-center " + (isFeatured ? "" : "mx-2 lg:mx-4")
          }
        >
          <h3
            className={
              "mb-3 font-semibold " +
              (isFeatured ? "text-2xl lg:text-4xl" : "text-xl lg:text-2xl")
            }
          >
            {data.title}
          </h3>
          {data.description ? (
            <p className="text-sm lg:text-base line-clamp-4">
              {data.description}
            </p>
          ) : null}
        </div>
      </div>
      {data.href ? (
        <Link
          href={data.href}
          aria-label={data.title || data.imgAlt || "Open"}
          className="absolute inset-0 z-10"
        />
      ) : null}
    </div>
  );
}
