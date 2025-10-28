import LanguageSwitcher from '../LanguageSwitcher';

interface TopBarProps {
	className?: string;
	locale: string;
}

export default async function TopBar({ className, locale }: TopBarProps) {
	const aboutMessages = (await import(`@messages/${locale}/about.json`))
		.default;
	return (
		<div
			className={`relative z-50 h10 w-full bg-[#EBF5F9] dark:bg-[#00131A] backdrop-blur border-b border-gray-200 dark:border-neutral-700 text-md ${
				className || ''
			}`}
		>
			<div className="container-gutter flex items-center justify-between py-1.5">
				<div className="flex items-center gap-4">
					<a
						href={`mailto:${aboutMessages.contact.email}`}
						className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
					>
						<span className="hidden lg:inline text-md">
							{aboutMessages.contact.email}
						</span>
						<span className="lg:hidden text-sm">
							E: {aboutMessages.contact.email}
						</span>
					</a>
					<a
						href={`tel:${aboutMessages.contact.phone.link}`}
						className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
					>
						<span className="hidden lg:inline text-md">
							{aboutMessages.contact.phone.display}
						</span>
						<span className="lg:hidden text-sm">
							{aboutMessages.contact.phone.display}
						</span>
					</a>
				</div>
				<LanguageSwitcher />
			</div>
		</div>
	);
}
