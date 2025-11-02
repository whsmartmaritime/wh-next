'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

function getLocalizedPath(pathname: string, targetLocale: string) {
	// Remove current locale prefix
	const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';

	// Find the path for target locale
	for (const paths of Object.values(routing.pathnames)) {
		if (paths.en === pathWithoutLocale || paths.vi === pathWithoutLocale) {
			return `/${targetLocale}${paths[targetLocale as keyof typeof paths]}`;
		}
	}

	// Fallback to home
	return `/${targetLocale}`;
}

export default function LanguageSwitcher() {
	const pathname = usePathname();

	return (
		<div className="flex gap-2 items-end">
			<Link
				href={getLocalizedPath(pathname, 'vi')}
				className="w-5 h-3 text-md font-normal opacity-70 hover:opacity-100 transition-opacity"
			>
				vi
			</Link>
			<Link
				href={getLocalizedPath(pathname, 'en')}
				className="w-5 h-3 text-md font-normal opacity-70 hover:opacity-100 transition-opacity"
			>
				en
			</Link>
		</div>
	);
}
