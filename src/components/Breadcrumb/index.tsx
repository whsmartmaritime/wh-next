import { routing } from "@/i18n/routing";

type BreadcrumbItem = {
  route: keyof typeof routing.pathnames; // "/about" | "/services" | ...
  label: string;
};

type Props = {
  locale: (typeof routing.locales)[number]; // "en" | "vi"
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ locale, items }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-sm"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const href = routing.pathnames[item.route][locale]; // lấy URL theo ngôn ngữ

        return (
          <span key={i} className="flex items-center">
            {!isLast ? (
              <a href={href} className="text-blue-600 hover:underline">
                {item.label}
              </a>
            ) : (
              <span className="text-neutral-500">{item.label}</span>
            )}
            {!isLast && <span className="mx-2">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
