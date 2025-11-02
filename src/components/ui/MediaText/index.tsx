import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BackgroundScanline } from '@/components/effects/BackgroundScanline';

export type MediaTextProps = {
	data: {
		href?: string;
		title?: ReactNode;
		description?: ReactNode;
		videoSrc?: string;
		imgSrc?: string;
		imgAlt?: string;
	};
	className?: string;
	variant?: 'featured' | 'compact';
};

export default function MediaText({
	data,
	className = '',
	variant = 'compact',
}: MediaTextProps) {
	const isFeatured = variant === 'featured';

	return (
		<div className={`relative block h-full group ${className}`}>
			<div className="relative grid grid-cols-1 lg:grid-cols-2 h-full bg-neutral-50 group-hover:bg-neutral-100 before:content-[''] before:block before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-left before:scale-x-0 before:bg-neutral-900 before:transition-transform before:duration-1000 group-hover:before:scale-x-100 ">
				<BackgroundScanline
					crosshairs={['top-right', 'bottom-left']}
					enableBorders={true}
					className={
						'absolute inset-0  group-hover:opacity-100 transition-transform ' +
						(isFeatured ? 'opacity-100' : 'opacity-0')
					}
				/>
				<div
					className={
						'relative aspect-[16/9] border border-neutral-500/20 ' +
						(isFeatured ? 'm-8 lg:m-12' : '')
					}
				>
					{data.videoSrc ? (
						<video
							src={data.videoSrc}
							autoPlay
							loop
							muted
							playsInline
							className="absolute inset-0 w-full h-full object-cover"
						/>
					) : data.imgSrc ? (
						<Image
							src={data.imgSrc}
							alt={data.imgAlt || 'Media image'}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover"
							priority={isFeatured}
						/>
					) : null}
				</div>
				<div
					className={`flex flex-col justify-center ${isFeatured ? '' : 'mx-2 lg:mx-4'}`}
				>
					{data.title && (
						<div
							className={
								'mb-3 font-semibold ' +
								(isFeatured ? 'text-2xl lg:text-4xl' : 'text-xl lg:text-2xl')
							}
						>
							{data.title}
						</div>
					)}
					{data.description && (
						<div className="text-sm lg:text-base line-clamp-4">
							{data.description}
						</div>
					)}
				</div>
			</div>
			{data.href ? (
				<Link
					href={data.href}
					aria-label={
						typeof data.title === 'string'
							? data.title
							: typeof data.imgAlt === 'string'
								? data.imgAlt
								: 'Open'
					}
					className="absolute inset-0 z-10"
				/>
			) : null}
		</div>
	);
}
