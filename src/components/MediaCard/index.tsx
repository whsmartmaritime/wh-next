import Image from "next/image";
import Link from "next/link";

export type MediaCardData = {
  route: string; // href
  title?: string;
  description?: string;
  ogImage?: string;
  publishedAt?: string;
  locale?: string;
  category?: string;
  tags?: readonly string[] | string[];
};

export type MediaCardProps = {
  data: MediaCardData;
  className?: string;
  variant?: "featured" | "compact";
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

export default function MediaCard({
  data,
  className = "",
  variant = "compact",
}: MediaCardProps) {
  const date = formatDate(data.publishedAt, data.locale);
  const isFeatured = variant === "featured";

  const outerCls =
    "relative grid grid-cols-1 group overflow-hidden bg-neutral-100 mb-8 " +
    (isFeatured ? "md:col-span-2 lg:grid-cols-2 " : "md:grid-cols-2 ") +
    className;
  const imgWrapCls = "relative aspect-[16/10]";
  const contentCls = "p-4 md:p-6";

  return (
    <article className={outerCls}>
      {data.ogImage ? (
        <div className={imgWrapCls}>
          <Image
            src={data.ogImage}
            alt={data.title || "Media image"}
            fill
            className="object-cover"
            priority={isFeatured}
          />
        </div>
      ) : null}
      <div className={contentCls}>
        {date ? (
          <div className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
            {date}
          </div>
        ) : null}
        <h3 className="mb-3 text-lg font-semibold md:text-xl text-neutral-900">
          <Link href={data.route} className="hover:underline">
            {data.title || data.route}
          </Link>
        </h3>
        {data.category ? (
          <div className="text-xs text-neutral-500">{data.category}</div>
        ) : null}
        {data.description ? (
          <p className="mt-3 text-sm text-neutral-700">{data.description}</p>
        ) : null}
      </div>
    </article>
  );
}
