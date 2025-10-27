import type React from 'react';

type CrosshairPosition =
	| 'top-left'
	| 'bottom-left'
	| 'top-right'
	| 'bottom-right';

interface Props {
	className?: string;
	style?: React.CSSProperties;
	crosshairs?: 'all' | CrosshairPosition[];
	enableBorders?: boolean;
	opacity?: number;
}

export const BackgroundScanline: React.FC<Props> = ({
	className,
	style,
	crosshairs,
	enableBorders = false,
	opacity = 0.08,
}: Props) => {
	const CrosshairIcon = () => (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
		</svg>
	);

	return (
		<div
			aria-hidden="true"
			className={`absolute inset-0 pointer-events-none z-0 ${
				enableBorders
					? 'border border-neutral-500/20 dark:border-neutral-700'
					: ''
			} ${className || ''}`}
			style={style}
		>
			{/* Light theme scanline - hiện trong section không có class dark */}
			<div
				className="absolute inset-0 bg-repeat transition-opacity duration-300 [.dark_&]:hidden"
				style={{
					backgroundImage: "url('/images/decorative/scanline-dark.png')",
					opacity: opacity,
				}}
			/>

			{/* Dark theme scanline - hiện trong section có class dark */}
			<div
				className="absolute inset-0 bg-repeat transition-opacity duration-300 hidden [.dark_&]:block"
				style={{
					backgroundImage: "url('/images/decorative/scanline-light.png')",
					opacity: opacity,
				}}
			/>

			{/* Crosshairs - giống sample */}
			{crosshairs && (
				<>
					{(crosshairs === 'all' || crosshairs.includes('top-left')) && (
						<div className="absolute w-4 h-4 -top-2 -left-2 text-neutral-400 dark:text-neutral-600 opacity-50 z-10">
							<CrosshairIcon />
						</div>
					)}

					{(crosshairs === 'all' || crosshairs.includes('bottom-left')) && (
						<div className="absolute w-4 h-4 -bottom-2 -left-2 text-neutral-400 dark:text-neutral-600 opacity-50 z-10">
							<CrosshairIcon />
						</div>
					)}

					{(crosshairs === 'all' || crosshairs.includes('top-right')) && (
						<div className="absolute w-4 h-4 -top-2 -right-2 text-neutral-400 dark:text-neutral-600 opacity-50 z-10">
							<CrosshairIcon />
						</div>
					)}

					{(crosshairs === 'all' || crosshairs.includes('bottom-right')) && (
						<div className="absolute w-4 h-4 -bottom-2 -right-2 text-neutral-400 dark:text-neutral-600 opacity-50 z-10">
							<CrosshairIcon />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default BackgroundScanline;
