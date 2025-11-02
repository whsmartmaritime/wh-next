'use client';

import { useEffect } from 'react';

/**
 * Progressive enhancement for CSS-only mobile menu
 * Base: Pure CSS checkbox pattern (works without JS)
 * Enhanced: Auto-close on navigation, ESC key, body scroll lock, swipe gestures
 */
export default function MobileMenuEnhancer() {
	useEffect(() => {
		const checkbox = document.getElementById(
			'mobile-menu-toggle',
		) as HTMLInputElement | null;
		if (!checkbox) return;

		// Auto-close on link click
		const handleLinkClick = (e: Event) => {
			const target = e.target as HTMLElement;
			if (target.closest('a') && checkbox) {
				checkbox.checked = false;
				// Immediately unlock scroll when closing
				document.body.style.overflow = '';
			}
		};

		// ESC key to close
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && checkbox?.checked) {
				checkbox.checked = false;
				// Immediately unlock scroll
				document.body.style.overflow = '';
			}
		};

		// Body scroll lock when menu open
		const handleCheckboxChange = () => {
			if (checkbox?.checked) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		};

		// Swipe gestures for mobile
		let touchStartY = 0;
		let touchStartX = 0;

		const handleTouchStart = (e: TouchEvent) => {
			if (!checkbox?.checked) return;
			touchStartY = e.touches[0].clientY;
			touchStartX = e.touches[0].clientX;
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (!checkbox?.checked) return;

			const touchEndY = e.changedTouches[0].clientY;
			const touchEndX = e.changedTouches[0].clientX;
			const deltaY = touchEndY - touchStartY;
			const deltaX = touchEndX - touchStartX;

			// Close on vertical swipe (>50px) or right swipe (>100px)
			const isVerticalSwipe =
				Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX);
			const isRightSwipe = deltaX > 100;

			if (isVerticalSwipe || isRightSwipe) {
				checkbox.checked = false;
				// Immediately unlock scroll
				document.body.style.overflow = '';
			}
		};

		// Attach event listeners
		const menuPanel = document.querySelector('.menu-panel');
		menuPanel?.addEventListener('click', handleLinkClick);
		document.addEventListener('keydown', handleEscape);
		checkbox.addEventListener('change', handleCheckboxChange);
		document.addEventListener('touchstart', handleTouchStart, {
			passive: true,
		});
		document.addEventListener('touchend', handleTouchEnd, { passive: true });

		// Cleanup
		return () => {
			menuPanel?.removeEventListener('click', handleLinkClick);
			document.removeEventListener('keydown', handleEscape);
			checkbox?.removeEventListener('change', handleCheckboxChange);
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchend', handleTouchEnd);
			document.body.style.overflow = '';
		};
	}, []);

	// This component doesn't render anything - pure enhancement
	return null;
}
