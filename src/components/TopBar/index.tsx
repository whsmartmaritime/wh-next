import LanguageSwitcher from "../LanguageSwitcher";
import { getTranslations } from "next-intl/server";

interface TopBarProps {
  className?: string;
}

export default async function TopBar({ className }: TopBarProps) {
  const t = await getTranslations("contact");

  return (
    <div
      className={`relative z-50 h10 w-full bg-[#EBF5F9] dark:bg-[#00131A] backdrop-blur border-b border-gray-200 dark:border-neutral-700 text-md ${
        className || ""
      }`}
    >
      <div className="container-gutter flex items-center justify-between py-1.5">
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${t("email")}`}
            className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <span className="hidden lg:inline text-md">
              Email: {t("email")}
            </span>
            <span className="lg:hidden text-sm">E: {t("email")}</span>
          </a>
          <a
            href={`tel:${t("phone.link")}`}
            className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <span className="hidden lg:inline text-md">
              Hotline: {t("phone.display")}
            </span>
            <span className="lg:hidden text-sm">T: {t("phone.display")}</span>
          </a>
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
