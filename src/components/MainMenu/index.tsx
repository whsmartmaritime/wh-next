import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from "next/image";

export default function MainMenu() {
  const t = useTranslations('navigation');
  const menuItems = t.raw('menuItems') as any[];

  return (
    <div className="text-neutral-800 dark:text-neutral-100">
      <ul className="flex space-x-8">
        {menuItems.map((item, index) => (
          <li key={index} className="group relative overflow-visible">
            <Link 
              href={item?.href} 
              className={`no-underline font-medium py-2 transition-colors duration-300 ${
                item?.hasDropdown 
                  ? 'text-xl pb-7 border-b-2 border-transparent hover:border-neutral-800 dark:hover:border-neutral-100' 
                  : 'hover:text-blue-600'
              }`}
            >
              {item?.title}
            </Link>
            
            {/* Dropdown for items with hasDropdown */}
            {item?.hasDropdown && (
              <div 
                className="fixed top-[90px] left-0 right-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] bg-white dark:bg-black shadow-lg"
              >
                <div className="container-gutter grid grid-cols-12 mx-auto px-4 py-8">
                  {/* Description */}
                  <p className="col-span-3 text-2xl">{item?.desc}</p>
                  
                  {/* Render columns dynamically */}
                  {item?.dropdownContent?.columns?.map((column, colIndex) => (
                    <div key={colIndex} className={`space-y-4 ${colIndex === 0 ? 'col-span-2' : 'col-span-3'}`}>
                      <span className="uppercase tracking-[0.25em] text-sm opacity-95 mb-4 font-semibold block">
                        {column?.title}
                      </span>
                      <ul className="space-y-2" role="menu">
                        {column?.links?.map((link, linkIndex) => (
                          <li key={linkIndex} role="menuitem">
                            <Link 
                              href={link?.href} 
                              className="no-underline block text-lg font-bold hover:opacity-80 transition-opacity"
                            >
                              {link?.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {/* CTA section with image */}
                  {item?.ctaContent && (
                    <div className="col-span-4 space-y-4">
                      <Image
                        src="/images/megamenu/solutions_menu.webp"
                        alt="wheelhouse equipment"
                        layout="responsive"
                        width={300}
                        height={100}
                        className="object-contain"
                      />
                      <Link href={item?.ctaContent?.href} className="no-underline flex items-center gap-2 text-lg font-bold hover:opacity-80 transition-opacity">
                        {item?.ctaContent?.title}
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
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
