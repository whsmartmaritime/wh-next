import { Link } from "@/i18n/navigation";
import MainMenu from "../MainMenu";
import MobileNavToggle from "../MobileNavToggle";
import TopBar from "@/components/TopBar";

export default async function Header() {
  return (
    <>
      {/* TopBar - hidden on lg+ */}
      <TopBar />

      <header className="sticky top-0 z-50 w-full py-0 bg-white dark:bg-zinc-900 overflow-visible border-b border-neutral-800/20 dark:border-neutral-100/20">
        <nav
          className="container-gutter grid grid-cols-12 items-center gap-x-6 h-[66px] sm:h-[76px] xl:h-[90px] text-zinc-900 dark:text-white overflow-visible"
          aria-label="Main site navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="col-span-9 lg:col-span-3 flex items-center"
            aria-label="Wheelhouse logo"
          >
            <svg
              viewBox="0 0 100 25"
              width="200"
              height="50"
              role="img"
              aria-label="Wheelhouse Maritime logo"
              aria-labelledby="logoTitle logoDesc"
              xmlns="http://www.w3.org/2000/svg"
              className="text-current"
            >
              <title id="logoTitle">Wheelhouse Maris logo</title>
              <desc id="logoDesc">
                Logo của Wheelhouse, gồm chữ Wheelhouse, MARIS và các thanh
                ngang cách điệu, dùng cho nhận diện thương hiệu.
              </desc>
              <text
                x="0.29"
                y="14.97"
                fontSize="16.95"
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight="700"
                fill="currentColor"
              >
                Wheelhouse
              </text>
              <text
                x="69.46"
                y="24.66"
                fontSize="6.96"
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight="700"
                fill="currentColor"
                letterSpacing="2"
              >
                MARIS
              </text>
              <rect
                x="0.29"
                y="19.82"
                width="21.19"
                height="4.84"
                fill="currentColor"
              />
              <rect
                x="23.53"
                y="19.82"
                width="12.71"
                height="4.84"
                fill="currentColor"
              />
              <rect
                x="40.48"
                y="19.82"
                width="7.87"
                height="4.84"
                fill="currentColor"
              />
              <rect
                x="52.77"
                y="19.82"
                width="4.84"
                height="4.84"
                fill="currentColor"
              />
              <rect
                x="63.43"
                y="19.82"
                width="3.03"
                height="4.84"
                fill="currentColor"
              />
            </svg>
          </Link>

          {/* Mobile toggle button */}
          <div className="col-span-3 lg:hidden ml-auto flex items-center justify-end">
            <MobileNavToggle />
          </div>

          {/* Main nav / Main menu */}
          <div className="hidden lg:block lg:col-span-7 static">
            <MainMenu />
          </div>
        </nav>
      </header>
    </>
  );
}
