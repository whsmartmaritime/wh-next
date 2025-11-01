import type commonMessagesEn from '@messages/en/common.json';
import Link from 'next/link';
import BackgroundScanline from '@/components/BackgroundScanline';
import ArrowIcon from '../icons/ArrowIcon';
import MobileMenuEnhancer from './MobileMenuEnhancer';

interface NavProps {
	commonMessages: typeof commonMessagesEn;
}

export default function NavMenu({ commonMessages }: NavProps) {
	const messages = commonMessages;
	const locale = commonMessages.locale; // ← Lấy từ JSON

	return (
		<>
			{/* Desktop Nav */}
			<nav className="hidden " aria-label="Main menu">
				<ul className="flex">
					{['solutions', 'services', 'about', 'contact'].map((key) => {
						const item = messages.nav[key as keyof typeof messages.nav];
						const hasSubmenu =
							'items' in item &&
							item.items &&
							Object.keys(item.items).length > 0;

						return (
							<li
								key={key}
								className={hasSubmenu ? 'relative group p-6' : 'p-6'}
							>
								<Link
									href={`/${locale}${item.href}`}
									className="font-semibold uppercase tracking-[0.25em] text-sm hover:underline hover:underline-offset-40 decoration-2 py-10"
								>
									{item.label}
								</Link>

								{/* Dropdown submenu */}
								{hasSubmenu && 'items' in item && item.items && (
									<ul className="absolute left-0 mt-8 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
										{Object.entries(item.items).map(([subKey, subItem]) => (
											<li key={subKey}>
												<Link
													href={`/${locale}${subItem.href}`}
													className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
												>
													{subItem.label}
													{'  '}
													<ArrowIcon size={10} className="lg:rotate-0" />
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Mobile Menu - CSS Only with Checkbox */}
			<div className="">
				<input
					type="checkbox"
					id="mobile-menu-toggle"
					className="hidden [&:checked+div_.hamburger]:opacity-0 [&:checked+div_.close]:opacity-100 [&:checked~.overlay]:pointer-events-auto [&:checked~.overlay]:opacity-100 [&:checked~.menu-panel]:translate-x-0"
					aria-label="Toggle mobile menu"
				/>

				<div className="relative inline-block">
					<label
						htmlFor="mobile-menu-toggle"
						className="relative p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-50 cursor-pointer inline-block"
						aria-label="Toggle navigation menu"
					>
						<div className="relative w-6 h-6">
							{/* Hamburger Icon */}
							<svg
								className="hamburger absolute inset-0 transition-opacity duration-200"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							{/* Close Icon */}
							<svg
								className="close absolute inset-0 transition-opacity duration-200 opacity-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
					</label>
				</div>

				{/* Overlay - Click to close */}
				<label
					htmlFor="mobile-menu-toggle"
					className="overlay fixed inset-0 bg-black/50 z-30 opacity-0 pointer-events-none transition-opacity duration-300"
					aria-label="Close menu overlay"
				>
					<span className="sr-only">Close menu</span>
				</label>

				{/* Mobile Menu Panel */}
				<div className="menu-panel fixed top-[var(--header-height,100px)] right-0 w-full max-h-[calc(100vh-var(--header-height,100px))] z-40 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700 transform translate-x-full transition-transform duration-300 ease-in-out overflow-hidden">
					<BackgroundScanline className="absolute inset-0" opacity={0.08} />
					<div className="relative h-full overflow-y-auto">
						<div className="container-gutter py-6">
							<nav aria-label="Mobile navigation">
								<ul className="flex flex-col lg:flex-row lg:flex-wrap text-neutral-800 dark:text-neutral-100">
									{['solutions', 'services', 'about', 'contact'].map((key) => {
										const item = messages.nav[key as keyof typeof messages.nav];
										const hasSubmenu =
											'items' in item &&
											item.items &&
											Object.keys(item.items).length > 0;

										return (
											<li key={key} className="group w-full lg:w-1/4">
												{/* Parent item - Pure link without label wrapper */}
												<Link
													href={`/${locale}${item.href}`}
													className="flex items-center gap-4 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-b border-neutral-200/30 dark:border-neutral-500/30 uppercase font-semibold tracking-[0.25em] text-sm group-hover:underline group-hover:underline-offset-20 decoration-2"
												>
													{item.label}
													<ArrowIcon size={10} />
												</Link>

												{/* Submenu items */}
												{hasSubmenu &&
													'items' in item &&
													item.items &&
													Object.entries(item.items).map(
														([subKey, subItem]) => (
															<Link
																key={subKey}
																href={`/${locale}${subItem.href}`}
																className="flex items-center justify-start gap-2 py-2 text-base  font-semibold lg:text-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 border-b border-neutral-200/20 dark:border-neutral-500/20"
															>
																{subItem.label}
															</Link>
														),
													)}
											</li>
										);
									})}
								</ul>
							</nav>

							{/* Close button at bottom */}
							<label
								htmlFor="mobile-menu-toggle"
								className="block mt-6 p-4 text-center border-t border-neutral-200 dark:border-neutral-700 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
								aria-label="Close navigation menu"
							>
								<span className="text-sm uppercase tracking-wider font-semibold">
									Close Menu
								</span>
							</label>
						</div>
					</div>
				</div>
			</div>

			{/* JS Enhancement - Progressive enhancement layer */}
			<MobileMenuEnhancer />
		</>
	);
}
