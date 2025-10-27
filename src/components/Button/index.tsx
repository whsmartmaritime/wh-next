import Link from 'next/link';
import type * as React from 'react';
import ArrowIcon from '../icons/ArrowIcon';

export type ButtonProps = {
	children: React.ReactNode;
	href?: string;
	className?: string;
	arrowRotation?: number;
	newTab?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: 'button' | 'submit' | 'reset';
};

const base =
	'group relative block overflow-hidden cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] focus:outline-none focus:ring-2 focus:ring-offset-0 bg-primary-600  shadow-md hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed';
const labelClass =
	'font-medium text-lg md:text-xl transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-origin-bottom-left';
const iconClass =
	'w-5 h-5 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-origin-center';
const content = (children: React.ReactNode, arrowRotation: number = 0) => (
	<>
		<div className="absolute inset-0 flex items-center justify-between w-full h-full px-4 md:px-6 lg:px-8 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-y-full pointer-events-none">
			<span className={labelClass}>{children}</span>
			<ArrowIcon className={iconClass} rotation={arrowRotation} />
		</div>
		<div className="absolute inset-0 flex items-center justify-between w-full h-full px-4 md:px-6 lg:px-8 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] translate-y-full group-hover:translate-y-0 pointer-events-none">
			<span className={`${labelClass} group-hover:rotate-3`}>{children}</span>
			<ArrowIcon
				className={`${iconClass} group-hover:translate-x-1`}
				rotation={arrowRotation}
			/>
		</div>
	</>
);

export default function Button({
	children,
	href,
	className,
	arrowRotation = 0,
	newTab = false,
	onClick,
	type = 'submit',
}: ButtonProps) {
	const classes = [base, className].filter(Boolean).join(' ');
	if (href) {
		if (newTab) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className={classes}
				>
					{content(children, arrowRotation)}
				</a>
			);
		}
		return (
			<Link href={href} className={classes}>
				{content(children, arrowRotation)}
			</Link>
		);
	}
	return (
		<button type={type} onClick={onClick} className={classes}>
			{content(children, arrowRotation)}
		</button>
	);
}
