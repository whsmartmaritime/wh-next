import Link from 'next/link';
import TopBar from '@/components/TopBar';
import LogoSvg from '../LogoSvg';
import Nav from '../Nav';

interface HeaderProps {
	locale: string;
}

export default async function Header({ locale }: HeaderProps) {
	// Load messages on server
	const commonMessages = (await import(`@messages/${locale}/common.json`))
		.default;

	return (
		<>
			<TopBar locale={locale} />

			<header className="sticky top-0 z-50 w-full py-0 bg-white dark:bg-zinc-900 overflow-visible border-b border-neutral-800/20 dark:border-neutral-100/20">
				<nav
					className="container-gutter grid grid-cols-12 items-center gap-x-6 h-[66px] sm:h-[76px] xl:h-[90px] text-zinc-900 dark:text-white overflow-visible"
					aria-label="Main site navigation"
				>
					<Link
						href={`/${locale}`}
						className="col-span-9 lg:col-span-3 flex items-center"
						aria-label="Wheelhouse logo"
					>
						<LogoSvg locale={locale} />
					</Link>

					{/* Unified hamburger menu for all screen sizes */}
					<div className="col-span-3 lg:col-span-9 ml-auto flex items-center justify-end">
						<Nav commonMessages={commonMessages} />
					</div>
				</nav>
			</header>
		</>
	);
}
