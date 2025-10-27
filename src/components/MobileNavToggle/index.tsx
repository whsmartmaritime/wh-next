'use client';
import { useCallback, useEffect, useState } from 'react';
import MobileNav from '@/components/MobileNav';
import BackgroundScanline from '../BackgroundScanline';

export default function MobileNavToggle() {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
	const close = useCallback(() => setIsOpen(false), []);

	// Optimized body scroll lock
	useEffect(() => {
		const body = document.body;

		if (isOpen) {
			const scrollY = window.scrollY;
			body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        left: 0;
        right: 0;
        overflow: hidden;
      `;
		} else {
			const scrollY = parseInt(body.style.top || '0', 10) * -1;
			body.style.cssText = '';
			window.scrollTo(0, scrollY);
		}

		return () => {
			body.style.cssText = '';
		};
	}, [isOpen]);

	// Optimized auto-close on link click
	useEffect(() => {
		if (!isOpen) return;

		const handleLinkClick = (e: Event) => {
			const target = e.target as HTMLElement;
			if (target.matches('a[href]') && target.closest('[data-mobile-menu]')) {
				close();
			}
		};

		document.addEventListener('click', handleLinkClick, { passive: true });
		return () => document.removeEventListener('click', handleLinkClick);
	}, [isOpen, close]);

	return (
		<>
			{/* Optimized Toggle Button */}
			<button
				type="button"
				onClick={toggle}
				className="relative p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-50"
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isOpen}
			>
				<div className="relative w-6 h-6">
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

			{/* Optimized Full Screen Menu */}
			{isOpen && (
				<div className="fixed top-[120px] left-0 w-full h-[calc(100vh-120px)] z-40 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700">
					<BackgroundScanline className="absolute inset-0" opacity={0.08} />
					<div className="relative h-full overflow-y-auto">
						<div className="container-gutter py-6" data-mobile-menu>
							<MobileNav />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
