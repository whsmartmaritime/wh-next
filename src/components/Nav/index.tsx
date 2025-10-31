import Link from 'next/link';
import BackgroundScanline from '@/components/BackgroundScanline';

interface NavProps {
	locale: string;
}

interface Messages {
	nav: {
		solutions: {
			href: string;
			label: string;
			items: Record<string, { href: string; label: string }>;
		};
		services: {
			href: string;
			label: string;
			items: Record<string, { href: string; label: string }>;
		};
		about: { href: string; label: string };
		contact: { href: string; label: string };
	};
}

export default async function NavMenu({ locale }: NavProps) {
	const messages: Messages = (await import(`@messages/${locale}/common.json`))
		.default;

	return (
		<>
			{/* Desktop Nav */}
			<nav className="hidden md:flex" aria-label="Main menu">
				<ul className="flex">
					<li className="relative group p-6">
						<Link
							href={`/${locale}${messages.nav.solutions.href}`}
							className="font-semibold"
						>
							{messages.nav.solutions.label}
						</Link>
						<ul className="absolute uppercase left-0 mt-2 w-40 border bg-white opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
							<li>
								<Link
									href={`/${locale}${messages.nav.solutions.items.navigation.href}`}
									className="block px-4 py-2 hover:bg-gray-100"
								>
									{messages.nav.solutions.items.navigation.label}
								</Link>
							</li>
							<li>
								<Link
									href={messages.nav.solutions.items.gmdss.href as string}
									className="block px-4 py-2 hover:bg-gray-100"
								>
									{messages.nav.solutions.items.gmdss.label}
								</Link>
							</li>
							<li>
								<Link
									href={
										messages.nav.solutions.items.connectivity.href as string
									}
									className="block px-4 py-2 hover:bg-gray-100"
								>
									{messages.nav.solutions.items.connectivity.label}
								</Link>
							</li>
							<li>
								<Link
									href={
										messages.nav.solutions.items['e-navigation'].href as string
									}
									className="block px-4 py-2 hover:bg-gray-100"
								>
									{messages.nav.solutions.items['e-navigation'].label}
								</Link>
							</li>
						</ul>
					</li>
					<li className="relative group p-6">
						<Link
							href={`/${locale}${messages.nav.services.href}`}
							className="font-semibold"
						>
							{messages.nav.services.label}
						</Link>
						<ul className="absolute uppercase left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
							<li>
								<Link
									href={`/${locale}${messages.nav.services.items.rm.href}`}
									className="block px-4 py-2 hover:bg-gray-100"
								>
									{messages.nav.services.items.rm.label}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}${messages.nav.services.items.installation.href}`}
									className="block px-4 py-2 hover:bg-gray-100"
								>
									{messages.nav.services.items.installation.label}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}${messages.nav.services.items.annualSurvey.href}`}
									className="block px-4 py-2 hover:bg-gray-100"
								>
									{messages.nav.services.items.annualSurvey.label}
								</Link>
							</li>
						</ul>
					</li>
					<li className="p-6">
						<Link
							href={`/${locale}${messages.nav.about.href}`}
							className="font-semibold"
						>
							{messages.nav.about.label}
						</Link>
					</li>
					<li className="p-6">
						<Link
							href={`/${locale}${messages.nav.contact.href}`}
							className="font-semibold"
						>
							{messages.nav.contact.label}
						</Link>
					</li>
				</ul>
			</nav>

			{/* Mobile Menu - CSS Only with Checkbox */}
			<div className="hidden">
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
					className="overlay fixed inset-0 bg-black/50 z-30 opacity-0 pointer-events-none transition-opacity duration-300 cursor-pointer"
				>
					<span className="sr-only">Close menu</span>
				</label>

				{/* Mobile Menu Panel */}
				<div className="menu-panel fixed top-[100px] left-0 w-full h-auto z-40 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700 translate-x-full transition-transform duration-300 ease-in-out">
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
											<li key={key} className="w-full lg:w-1/4">
												{/* Parent item */}
												<label
													htmlFor="mobile-menu-toggle"
													className="block cursor-pointer"
												>
													<a
														href={`/${locale}${item.href}`}
														className="flex items-center gap-4 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-b border-neutral-200/30 dark:border-neutral-500/30 uppercase font-semibold tracking-[0.25em] text-sm"
													>
														<span>{item.label}</span>
													</a>
												</label>

												{/* Submenu items - always rendered */}
												{hasSubmenu &&
													'items' in item &&
													item.items &&
													Object.entries(item.items).map(
														([subKey, subItem]) => (
															<label
																key={subKey}
																htmlFor="mobile-menu-toggle"
																className="block cursor-pointer"
															>
																<a
																	href={`/${locale}${subItem.href}`}
																	className="flex items-center justify-start gap-2 p-2 text-base hover:bg-neutral-50 dark:hover:bg-neutral-900 border-b border-neutral-200/20 dark:border-neutral-500/20"
																>
																	<span>{subItem.label}</span>
																</a>
															</label>
														),
													)}
											</li>
										);
									})}
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
