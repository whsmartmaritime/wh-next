'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
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

export default function NavMenu({ locale }: NavProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Messages | null>(null);

	const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
	const close = useCallback(() => setIsOpen(false), []);

	// Load messages
	useEffect(() => {
		import(`@messages/${locale}/common.json`).then((mod) =>
			setMessages(mod.default),
		);
	}, [locale]);

	// Scroll lock for mobile menu
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

	// Auto-close on link click
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

	if (!messages) return null; // Loading state

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

			{/* Mobile Toggle Button */}
			<div className="md:hidden">
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
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="fixed top-[120px] left-0 w-full h-[calc(100vh-120px)] z-40 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700 md:hidden">
					<BackgroundScanline className="absolute inset-0" opacity={0.08} />
					<div className="relative h-full overflow-y-auto">
						<div className="container-gutter py-6" data-mobile-menu>
							<nav aria-label="Mobile navigation">
								<ul className="flex flex-col text-neutral-800 dark:text-neutral-100">
									<li className="border border-neutral-200/30 dark:border-neutral-500/30">
										<Link
											href={`/${locale}${messages.nav.solutions.href}`}
											className="block p-4 text-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
										>
											{messages.nav.solutions.label}
										</Link>
									</li>
									<li className="border border-neutral-200/30 dark:border-neutral-500/30">
										<Link
											href={`/${locale}${messages.nav.services.href}`}
											className="block p-4 text-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
										>
											{messages.nav.services.label}
										</Link>
									</li>
									<li className="border border-neutral-200/30 dark:border-neutral-500/30">
										<Link
											href={`/${locale}${messages.nav.about.href}`}
											className="block p-4 text-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
										>
											{messages.nav.about.label}
										</Link>
									</li>
									<li className="border border-neutral-200/30 dark:border-neutral-500/30">
										<Link
											href={`/${locale}${messages.nav.contact.href}`}
											className="block p-4 text-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
										>
											{messages.nav.contact.label}
										</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
