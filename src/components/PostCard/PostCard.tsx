import Image from "next/image";
import Link from "next/link";
import type { PostEntry } from "@/lib/postIndex.generated";
import BackgroundScanline from "../BackgroundScanline";

type EntryLike = Omit<PostEntry, "tags"> & {
  tags?: readonly string[] | string[];
};

export type PostCardProps = {
  entry: EntryLike;
  className?: string;
  variant?: "featured" | "compact" | "service";
};

function formatDate(input?: string, locale?: string) {
  if (!input) return null;
  const t = Date.parse(input);
  if (!Number.isFinite(t)) return null;
  try {
    return new Intl.DateTimeFormat(locale || undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(t));
  } catch {
    return input;
  }
}

export default function PostCard({
  entry,
  className = "",
  variant = "compact",
}: PostCardProps) {
  const date = formatDate(entry.publishedAt, entry.locale);
  const isFeatured = variant === "featured";

  return (
    <div
      className={
        "relative grid grid-cols-1 lg:grid-cols-2 group overflow-hidden border border-neutral-800 bg-neutral-900/40 transition hover:border-neutral-700 hover:shadow-xl " +
        (isFeatured ? "md:col-span-2 " : "") +
        className
      }
    >
      <BackgroundScanline
        crosshairs={["top-right", "bottom-left"]}
        className="absolute inset-0 "
        opacity={0.1}
      />
      {entry.ogImage ? (
        <div
          className={
            "relative aspect-[16/10] " + (isFeatured ? "m-8 lg:m-12" : "")
          }
        >
          <Image
            src={entry.ogImage}
            alt={entry.title || "Post image"}
            fill
            className="object-cover"
            priority={isFeatured}
          />
        </div>
      ) : null}
      <div className=" p-4 md:p-6">
        {date ? (
          <div className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
            {date}
          </div>
        ) : null}
        <h3
          className={
            "mb-3 text-lg font-semibold leading-snug text-neutral-100 md:text-xl"
          }
        >
          <Link href={entry.route} className="hover:underline">
            {entry.title || entry.route}
          </Link>
        </h3>
        {entry.category ? (
          <div className="text-xs text-neutral-400">{entry.category}</div>
        ) : null}
      </div>
    </div>
  );
}
