import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NavMenu() {
  const t = await getTranslations("header");
  return (
    <>
      <ul aria-label="Main menu" className="flex">
        <li className="relative group p-6">
          <Link href="/solutions" className=" font-semibold">
            {t("nav.solutions.title")}
          </Link>
          <ul className="absolute uppercase left-0 mt-2 w-40 border bg-white opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
            <li>
              <Link
                href="/solutions/navigation"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t("nav.solutions.navigation")}
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/gmdss"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t("nav.solutions.gmdss")}
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/connectivity"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t("nav.solutions.connectivity")}
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/e-navigation"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t("nav.solutions.e-navigation")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="relative group p-6">
          <Link href="/services" className="font-semibold">
            {t("nav.services.title")}
          </Link>
          <ul className="absolute uppercase left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
            <li>
              <Link
                href={{ pathname: "/services", hash: "repair-maintenance" }}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t("nav.services.repair-maintenance")}
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/services", hash: "installation" }}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {t("nav.services.installation")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="p-6">
          <Link href="/about" className="font-semibold">
            {t("nav.about")}
          </Link>
        </li>
        <li className="p-6">
          <Link
            href={{ pathname: "/about", hash: "contact" }}
            className="font-semibold"
          >
            {t("nav.contact")}
          </Link>
        </li>
      </ul>
    </>
  );
}
