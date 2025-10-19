import { Link } from "@/i18n/navigation";
import MobileNavToggle from "../MobileNavToggle";
import TopBar from "@/components/TopBar";
import Nav from "../Nav";
import LogoSvg from "../LogoSvg";

export default async function Header() {
  return (
    <>
      <TopBar />

      <header className="sticky top-0 z-50 w-full py-0 bg-white dark:bg-zinc-900 overflow-visible border-b border-neutral-800/20 dark:border-neutral-100/20">
        <nav
          className="container-gutter grid grid-cols-12 items-center gap-x-6 h-[66px] sm:h-[76px] xl:h-[90px] text-zinc-900 dark:text-white overflow-visible"
          aria-label="Main site navigation"
        >
          <Link
            href="/"
            className="col-span-9 lg:col-span-3 flex items-center"
            aria-label="Wheelhouse logo"
          >
            <LogoSvg />
          </Link>

          {/* Mobile toggle button */}
          <div className="col-span-3 lg:hidden ml-auto flex items-center justify-end">
            <MobileNavToggle />
          </div>

          {/* Main nav / Main menu */}
          <div className="hidden lg:block lg:col-span-7 lg:col-start-6 static">
            <Nav />
          </div>
        </nav>
      </header>
    </>
  );
}
