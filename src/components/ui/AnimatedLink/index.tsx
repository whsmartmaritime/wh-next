import Link from 'next/link';
import type * as React from 'react';
import ArrowIcon from '../../icons/ArrowIcon';

export type AnimatedLinkProps = {
	children: React.ReactNode;
	href: string;
	className?: string;
	newTab?: boolean;
	theme?: 'light' | 'dark';
};

export default function AnimatedLink({
	children,
	href,
	className,
	newTab = false,
	theme = 'light',
}: AnimatedLinkProps) {
	return (
		<Link
			href={href}
			className={`
				group relative flex items-center justify-between overflow-hidden border-t border-b border-neutral-500/20
				${className || ''}
			`}
			target={newTab ? '_blank' : undefined}
			rel={newTab ? 'noopener noreferrer' : undefined}
		>
			{/* Layer 1: Original - slide up on hover */}
			<div
				className={`
					absolute inset-0 flex items-center justify-between px-4 md:px-6 transition-all duration-700 ease-in-out group-hover:-translate-y-full bg-transparent
					${theme === 'light' ? ' text-black' : ' text-white'}
				`}
			>
				<span className="font-medium text-lg md:text-xl">{children}</span>
				<ArrowIcon className="w-5 h-5" />
			</div>

			{/* Layer 2: Hover state - slide up from bottom */}
			<div
				className={`
					absolute inset-0 flex items-center justify-between px-4 md:px-6
					translate-y-full transition-all duration-700 ease-in-out group-hover:translate-y-0
					${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}
				`}
			>
				<span className="font-medium text-lg md:text-xl">{children}</span>
				<ArrowIcon className="w-5 h-5" />
			</div>
		</Link>
	);
}
