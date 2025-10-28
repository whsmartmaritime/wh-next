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
				<svg
					className="w-full h-full"
					viewBox="0 0 30 20"
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					aria-hidden="true"
				>
					<rect width="30" height="20" fill="#da251d" />
					<polygon
						points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
						fill="#ff0"
					/>
				</svg>
			</Link>
			<Link
				href={getLocalizedPath(pathname, 'en')}
				className="w-5 h-3 text-md font-normal opacity-70 hover:opacity-100 transition-opacity"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 50 30"
					className="w-full h-full"
					aria-hidden="true"
				>
					<clipPath id="s">
						<path d="M0,0 v30 h60 v-30 z" />
					</clipPath>
					<clipPath id="t">
						<path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
					</clipPath>
					<g clipPath="url(#s)">
						<path d="M0,0 v30 h60 v-30 z" fill="#012169" />
						<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
						<path
							d="M0,0 L60,30 M60,0 L0,30"
							clipPath="url(#t)"
							stroke="#C8102E"
							strokeWidth="4"
						/>
						<path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
						<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
					</g>
				</svg>
			</Link>
		</div>
	);
}
