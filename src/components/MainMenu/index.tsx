import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from "next/image";

export default function MainMenu() {
  const t = useTranslations('navigation');
  const menuItems = t.raw('menuItems') as any[];

  return (
    <div className="text-neutral-800 dark:text-neutral-100">
      <ul className="flex space-x-8">
        <li className="group relative overflow-visible">
          <Link href={menuItems[0]?.href} className="no-underline text-xl font-medium py-2 pb-7 border-b-2 border-transparent hover:border-neutral-800 dark:hover:border-neutral-100 transition-colors duration-300">
            {menuItems[0]?.title}
          </Link>
          <div 
            className="fixed top-[90px] left-0 right-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] bg-white dark:bg-black shadow-lg"
          >
            <div className="container-gutter grid grid-cols-12 mx-auto px-4 py-8">
              {/* Column 1: description spans 4 cols */}
             
                <p className="col-span-3 text-2xl">{menuItems[0]?.desc}</p>
             
              {/* Column 2: first nav group */}
              <div className="col-span-2 space-y-4">
                <p className="uppercase tracking-[0.25em] text-sm opacity-95 mb-4 font-semibold">{menuItems[0]?.dropdownContent?.columns[0]?.title}</p>
                <Link href={menuItems[0]?.dropdownContent?.columns[0]?.links[0]?.href} className="no-underline block text-lg font-bold hover:opacity-80 transition-opacity">
                  {menuItems[0]?.dropdownContent?.columns[0]?.links[0]?.title}
                </Link>
                <Link href={menuItems[0]?.dropdownContent?.columns[0]?.links[1]?.href} className="no-underline block text-lg font-bold hover:opacity-80 transition-opacity">
                  {menuItems[0]?.dropdownContent?.columns[0]?.links[1]?.title}
                </Link>
                <Link href={menuItems[0]?.dropdownContent?.columns[0]?.links[2]?.href} className="no-underline block text-lg font-bold hover:opacity-80 transition-opacity">
                  {menuItems[0]?.dropdownContent?.columns[0]?.links[2]?.title}
                </Link>
              </div>
              <div className="col-span-3 space-y-4">
                <p className="uppercase tracking-[0.25em] text-sm opacity-95 mb-4 font-semibold">{menuItems[0]?.dropdownContent?.columns[1]?.title}</p>
                <Link href={menuItems[0]?.dropdownContent?.columns[1]?.links[0]?.href} className="no-underline block text-lg font-bold hover:opacity-80 transition-opacity">
                  {menuItems[0]?.dropdownContent?.columns[1]?.links[0]?.title}
                </Link>
                <Link href={menuItems[0]?.dropdownContent?.columns[1]?.links[1]?.href} className="no-underline block text-lg font-bold hover:opacity-80 transition-opacity">
                  {menuItems[0]?.dropdownContent?.columns[1]?.links[1]?.title}
                </Link>
                <Link href={menuItems[0]?.dropdownContent?.columns[1]?.links[2]?.href} className="no-underline block text-lg font-bold hover:opacity-80 transition-opacity">
                  {menuItems[0]?.dropdownContent?.columns[1]?.links[2]?.title}
                </Link>
              </div>
              <div className="col-span-4 space-y-4">
                <Image
                  src="/images/megamenu/solutions_menu.webp"
                  alt="wheelhouse equipment"
                  layout="responsive"
                  width={300}
                  height={100}
                  className="object-contain"
                />
                <Link href={menuItems[0]?.ctaContent?.href} className="no-underline flex items-center gap-2 text-lg font-bold hover:opacity-80 transition-opacity">
                  {menuItems[0]?.ctaContent?.title}
                  <svg
                    className="w-3 h-3 text-current"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                  >
                    <path d="M2.20117 0.5L12.7615 0.5V11.06" />
                    <path d="M0.759766 12.5L12.7601 0.5" />
                  </svg>
                </Link>
              </div>
              
            </div>
          </div>
        </li>

        <li>
          <Link href={menuItems[1]?.href} className="no-underline hover:text-blue-600 font-medium py-2 transition-colors">
            {menuItems[1]?.title}
          </Link>
        </li>

        <li>
          <Link href={menuItems[2]?.href} className="no-underline hover:text-blue-600 font-medium py-2 transition-colors">
            {menuItems[2]?.title}
          </Link>
        </li>

        <li>
          <Link href={menuItems[3]?.href} className="no-underline hover:text-blue-600 font-medium py-2 transition-colors">
            {menuItems[3]?.title}
          </Link>
        </li>

        <li>
          <Link href={menuItems[4]?.href} className="no-underline hover:text-blue-600 font-medium py-2 transition-colors">
            {menuItems[4]?.title}
          </Link>
        </li>
      </ul>
    </div>
  );
}
