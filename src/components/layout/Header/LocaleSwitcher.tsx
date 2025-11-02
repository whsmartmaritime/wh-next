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

export default function LocaleSwitcher() {
	const pathname = usePathname();
	// Detect current locale from pathname
	const currentLocale = (pathname.match(/^\/([a-z]{2})/) || [])[1] || 'en';

	return (
		<div className="relative inline-block">
			{/* CSS-only toggle checkbox */}
			<input
				type="checkbox"
				id="locale-menu-toggle"
				className="hidden [&:checked~.locale-panel]:opacity-100 [&:checked~.locale-panel]:pointer-events-auto [&:checked+label_svg]:rotate-180"
				aria-label="Toggle language menu"
			/>

			{/* Trigger button (label) */}
			<label
				htmlFor="locale-menu-toggle"
				className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
			>
				<span className="uppercase">{currentLocale}</span>
				<svg
					className="w-4 h-4 transition-transform duration-200"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</label>

			{/* Toggle panel with links */}
			<div className="locale-panel absolute right-0 mt-2 w-32 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-lg opacity-0 pointer-events-none transition-opacity duration-200">
				<Link
					href={getLocalizedPath(pathname, 'vi')}
					className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
				>
					Tiếng Việt
				</Link>
				<Link
					href={getLocalizedPath(pathname, 'en')}
					className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
				>
					English
				</Link>
			</div>
		</div>
	);
}
