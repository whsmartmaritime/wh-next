import LanguageSwitcher from '../LanguageSwitcher';

interface TopBarProps {
	className?: string;
	locale: string;
}

export default async function TopBar({ className, locale }: TopBarProps) {
	const aboutMessages = (await import(`@messages/${locale}/about.json`))
		.default;
	const emailInfo = Buffer.from(
		aboutMessages.contact.email.info.base64,
		'base64',
	).toString('utf-8');
	return (
		<div
			className={`relative z-50 h10 w-full bg-[#EBF5F9] dark:bg-[#00131A] backdrop-blur border-b border-gray-200 dark:border-neutral-700 text-md ${
				className || ''
			}`}
		>
			<div className="container-gutter flex items-center justify-between py-1.5">
				<div className="flex items-center gap-4">
					<a
						href={`mailto:${emailInfo}`}
						className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors gap-1 flex items-center"
					>
						<span className="hidden lg:inline text-md">Email:</span>
						<span className="lg:hidden text-sm">E.</span>
						{emailInfo}
					</a>
					<a
						href={`tel:${aboutMessages.contact.phone.link}`}
						className="hidden lg:flex tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors gap-1 items-center"
					>
						<span className="hidden lg:inline text-md">Hot Line:</span>
						<span className="lg:hidden text-sm">T.</span>
						{aboutMessages.contact.phone.display}
					</a>
				</div>
				<LanguageSwitcher />
			</div>
		</div>
	);
}
