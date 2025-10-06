import Image from "next/image";
import Link from "next/link";
import { BackgroundScanline } from "../BackgroundScanline";

export type MediaCardData = {
  href: string; // href
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
    <Link href={data.href}>
      <div
        className={
          "relative grid grid-cols-1 group bg-neutral-50 hover:bg-neutral-100 mb-8  before:content-[''] before:block before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-left before:scale-x-0 before:bg-neutral-900 before:transition-transform before:duration-1000 hover:before:scale-x-100 " +
          (isFeatured ? "md:col-span-2 lg:grid-cols-2 " : "lg:grid-cols-2 ") +
          className
        }
      >
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
              "relative aspect-[16/10] " + (isFeatured ? "m-8 lg:m-12" : "")
            }
          >
            <Image
              src={data.imgSrc}
              alt={data.imgAlt || "Media image"}
              fill
              className="object-cover"
              priority={isFeatured}
            />
          </div>
        ) : null}
        <div
          className={
            "flex flex-col justify-center " + (isFeatured ? "" : "m-2 lg:m-4")
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
            <p className="mt-3 text-sm lg:text-base">{data.description}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
