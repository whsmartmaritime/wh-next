'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BackgroundScanline from '@/components/BackgroundScanline';
import ArrowIcon from '@/components/icons/ArrowIcon';

interface MobileMenuProps {
	commonMessages: {
		locale: string;
		nav: Record<
			string,
			{
				href: string;
				label: string;
				items?: Record<string, { href: string; label: string }>;
			}
		>;
	};
}

export default function MobileMenu({ commonMessages }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	// Handle all side effects when menu state changes
	useEffect(() => {
		if (!isOpen) return;

		// Lock body scroll
		document.body.style.overflow = 'hidden';

		// ESC key handler
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		// Touch/swipe handler for mobile
		let touchStartY = 0;
		let touchStartX = 0;

		const handleTouchStart = (e: TouchEvent) => {
			touchStartY = e.touches[0].clientY;
			touchStartX = e.touches[0].clientX;
		};

		const handleTouchEnd = (e: TouchEvent) => {
			const touchEndY = e.changedTouches[0].clientY;
			const touchEndX = e.changedTouches[0].clientX;
			const deltaY = touchEndY - touchStartY;
			const deltaX = touchEndX - touchStartX;

			// Close on any vertical swipe (>50px) or horizontal swipe right (>100px)
			const isVerticalSwipe =
				Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX);
			const isRightSwipe = deltaX > 100;

			if (isVerticalSwipe || isRightSwipe) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('touchstart', handleTouchStart, {
			passive: true,
		});
		document.addEventListener('touchend', handleTouchEnd, { passive: true });

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchend', handleTouchEnd);
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	const { locale, nav } = commonMessages;

	return (
		<div>
			{/* Toggle Button */}
			<button
				type="button"
				onClick={toggle}
				className="relative p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-50"
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isOpen}
			>
				<div className="relative w-6 h-6">
					{/* Hamburger Icon */}
					<svg
						className={`absolute inset-0 transition-opacity duration-200 ${
							isOpen ? 'opacity-0' : 'opacity-100'
						}`}
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
						className={`absolute inset-0 transition-opacity duration-200 ${
							isOpen ? 'opacity-100' : 'opacity-0'
						}`}
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
			</button>

			{/* Only render when open */}
			{isOpen && (
				<>
					{/* Overlay */}
					<div
						className="fixed inset-0 bg-black/50  animate-in fade-in duration-300"
						onClick={close}
						aria-hidden="true"
					/>

					{/* Menu Panel - Fixed for full-width mobile takeover */}
					<div className="fixed top-[100px] left-0 w-full h-auto  bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700 animate-in slide-in-from-right duration-300">
						<BackgroundScanline className="absolute inset-0" opacity={0.08} />
						<div className="relative h-full overflow-y-auto">
							<div className="container-gutter py-6">
								<nav aria-label="Main navigation">
									<ul className="flex flex-col lg:flex-row lg:flex-wrap text-neutral-800 dark:text-neutral-100">
										{['solutions', 'services', 'about', 'contact'].map(
											(key) => {
												const item = nav[key];
												const hasSubmenu =
													item.items && Object.keys(item.items).length > 0;

												return (
													<li key={key} className="w-full lg:w-1/4">
														{/* Parent item */}
														<Link
															href={`/${locale}${item.href}`}
															className="flex items-center  gap-4 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-b border-neutral-200/30 dark:border-neutral-500/30 uppercase font-semibold tracking-[0.25em] text-sm"
															onClick={close}
														>
															<span>{item.label}</span>

															<ArrowIcon
																size={10}
																rotation={45}
																className="lg:rotate-0"
															/>
														</Link>

														{/* Submenu items - always rendered, indented */}
														{hasSubmenu &&
															item.items &&
															Object.entries(item.items).map(
																([subKey, subItem]) => (
																	<Link
																		key={subKey}
																		href={`/${locale}${subItem.href}`}
																		className="flex items-center justify-start gap-2 p-2 text-base hover:bg-neutral-50 dark:hover:bg-neutral-900 border-b border-neutral-200/20 dark:border-neutral-500/20"
																		onClick={close}
																	>
																		<span>{subItem.label}</span>
																		<ArrowIcon size={10} />
																	</Link>
																),
															)}
													</li>
												);
											},
										)}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
