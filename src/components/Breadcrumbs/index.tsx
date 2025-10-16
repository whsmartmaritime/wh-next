import Link from "next/link";
import { type ReactNode } from "react";

export type Crumb = {
  href?: string;
  label: ReactNode;
};

export type BreadcrumbsProps = {
  items: Crumb[];
  separator?: ReactNode;
  className?: string;
};

export default async function Breadcrumbs({
  items,
  separator = " › ",
  className = "",
}: BreadcrumbsProps) {
  const currentItems = items;

  return (
    <nav aria-label="Breadcrumb" className={` text-xl ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {currentItems.map((c, i) => {
          const isLast = i === currentItems.length - 1;
          const isLink = !isLast && !!c.href;
          const LabelWrapper = ({ children }: { children: ReactNode }) =>
            isLink ? (
              <Link
                href={c.href!}
                className="text-muted-foreground hover:underline"
              >
                {children}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "font-medium" : "text-muted-foreground"}
              >
                {children}
              </span>
            );

          return (
            <li key={i} className="inline-flex items-center gap-1">
              {i > 0 ? <span aria-hidden="true">{separator}</span> : null}
              <LabelWrapper>{c.label}</LabelWrapper>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
