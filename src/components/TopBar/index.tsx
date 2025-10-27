import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '../LanguageSwitcher';

interface TopBarProps {
	className?: string;
}

export default async function TopBar({ className }: TopBarProps) {
	const t = await getTranslations('about');
	return (
		<div
			className={`relative z-50 h10 w-full bg-[#EBF5F9] dark:bg-[#00131A] backdrop-blur border-b border-gray-200 dark:border-neutral-700 text-md ${
				className || ''
			}`}
		>
			<div className="container-gutter flex items-center justify-between py-1.5">
				<div className="flex items-center gap-4">
					<a
						href={`mailto:${t('contact.email')}`}
						className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
					>
						<span className="hidden lg:inline text-md">
							{t('contact.email')}
						</span>
						<span className="lg:hidden text-sm">E: {t('contact.email')}</span>
					</a>
					<a
						href={`tel:${t('contact.phone.link')}`}
						className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
					>
						<span className="hidden lg:inline text-md">
							{t('contact.phone.display')}
						</span>
						<span className="lg:hidden text-sm">
							{t('contact.phone.display')}
						</span>
					</a>
				</div>
				<LanguageSwitcher />
			</div>
		</div>
	);
}
