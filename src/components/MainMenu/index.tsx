import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function MainMenu() {
  const t = useTranslations('navigation');

  return (
    <div>
      <ul className="flex space-x-8">
        <li className="group relative">
          <Link href="/solutions" className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors">
            {t('Solutions.title')}
          </Link>
          {/* Pure CSS dropdown - positioned just below header, may overlap with content when TopBar is hidden but simple */}
          <div 
            className="fixed top-[66px] sm:top-[76px] xl:top-[90px] left-0 right-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] bg-white shadow-lg border-t"
          >
            <div className="container mx-auto px-4 py-8">
              <p className="text-gray-600">Solutions dropdown content here...</p>
            </div>
          </div>
        </li>

        <li>
          <Link href="/services" className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors">
            {t('Services.title')}
          </Link>
        </li>

        <li>
          <Link href="/about" className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors">
            {t('Company.title')}
          </Link>
        </li>

        <li>
          <Link href="/contact" className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors">
            Contact
          </Link>
        </li>

        <li>
          <Link href="/blog" className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors">
            Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}
