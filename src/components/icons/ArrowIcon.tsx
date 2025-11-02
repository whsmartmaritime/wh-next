import type * as React from 'react';

export type ArrowIconProps = {
	className?: string;
	size?: number;
	rotation?: number; // degrees
};

const ArrowIcon: React.FC<ArrowIconProps> = ({
	className,
	size = 16,
	rotation = 0,
}) => {
	return (
		<span
			style={{ display: 'inline-flex', transform: `rotate(${rotation}deg)` }}
		>
			<svg
				className={className}
				width={size}
				height={size}
				viewBox="0 0 14 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path d="M2.20117 0.5L12.7615 0.5V11.06" />
				<path d="M0.759766 12.5L12.7601 0.5" />
			</svg>
		</span>
	);
};

export default ArrowIcon;
