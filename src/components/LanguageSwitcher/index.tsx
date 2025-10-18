"use client";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex items-end">
      <Link
        href={`/vi${pathname}`}
        className="px-1 py-1 text-md font-normal opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg
          width="20"
          height="15"
          viewBox="0 0 30 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="20" fill="#da251d" />
          <polygon
            points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
            fill="#ff0"
          />
        </svg>
      </Link>
      <Link
        href={`/en${pathname}`}
        className="px-1 py-1 text-md font-normal opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 30"
          width="20"
          height="15"
        >
          <clipPath id="t">
            <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
          </clipPath>
          <path d="M0,0v30h50v-30z" fill="#012169" />
          <path d="M0,0 50,30M50,0 0,30" stroke="#fff" stroke-width="6" />
          <path
            d="M0,0 50,30M50,0 0,30"
            clip-path="url(#t)"
            stroke="#C8102E"
            stroke-width="4"
          />
          <path
            d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z"
            fill="#C8102E"
            stroke="#FFF"
            stroke-width="2"
          />
        </svg>
      </Link>
    </div>
  );
}
