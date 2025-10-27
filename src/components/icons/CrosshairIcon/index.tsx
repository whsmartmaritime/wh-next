import type React from 'react';

interface CrosshairIconProps {
	className?: string;
	size?: 'small' | 'medium' | 'large';
	bold?: boolean;
}

export const CrosshairIcon: React.FC<CrosshairIconProps> = ({
	className = '',
	size = 'large',
	bold = false,
}) => {
	const sizeClasses = {
		small: 'w-4 h-4',
		medium: 'w-5 h-5',
		large: 'w-6 h-6',
	};

	const strokeWidth = bold ? 'stroke-2' : 'stroke-1';

	return (
		<svg
			className={`${sizeClasses[size]} ${strokeWidth} ${className}`}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 20 21"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path d="M10 0.332031V20.332" />
			<path d="M0 10.332L20 10.332" />
		</svg>
	);
};
