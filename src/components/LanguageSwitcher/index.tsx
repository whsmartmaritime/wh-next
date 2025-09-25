"use client";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as "en" | "vi";
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageSwitch = async (targetLocale: "en" | "vi") => {
    if (locale === targetLocale || isLoading) return;
    setIsLoading(true);

    try {
      window.location.href = `/${targetLocale}${pathname}`;
    } catch (error) {
      console.error("Language switch error:", error);
      router.push("/", { locale: targetLocale });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-end">
      <button
        onClick={() => handleLanguageSwitch("vi")}
        disabled={isLoading}
        className={` px-1 py-1 text-md transition-opacity ${
          locale === "vi"
            ? "font-bold opacity-100"
            : "font-normal opacity-70 hover:opacity-100"
        } ${isLoading ? "pointer-events-none opacity-50" : ""}`}
        type="button"
      >
        🇻🇳
      </button>
      <button
        onClick={() => handleLanguageSwitch("en")}
        disabled={isLoading}
        className={`px-1 py-1 text-md transition-opacity ${
          locale === "en"
            ? "font-bold opacity-100"
            : "font-normal opacity-70 hover:opacity-100"
        } ${isLoading ? "pointer-events-none opacity-50" : ""}`}
        type="button"
      >
        🇺🇸
      </button>
    </div>
  );
}
