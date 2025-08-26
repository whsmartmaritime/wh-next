"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type SliderImage = {
	src: string;
	alt: string;
};

export type SliderProps = {
	images: SliderImage[];
	aspectRatio?: string; // e.g. '4/3', '16/9'
	className?: string;
	autoPlay?: boolean;
	intervalMs?: number;
	pauseOnHover?: boolean;
	transitionMs?: number; // fade duration
		transitionType?: 'fade' | 'seamless' | 'morph';
};

export default function Slider({
	images,
	aspectRatio = '16/10',
	className,
	autoPlay = true,
	intervalMs = 4000,
	pauseOnHover = true,
	transitionMs = 1000,
	transitionType = 'fade',
}: SliderProps) {
	const [current, setCurrent] = useState(0);
	const [paused, setPaused] = useState(false);

	// Autoplay effect
	useEffect(() => {
		if (!autoPlay || paused || images.length <= 1) return;

		// Respect prefers-reduced-motion
		if (typeof window !== 'undefined' && window.matchMedia) {
			const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
			if (reduce.matches) return;
		}

		const id = setInterval(() => {
			setCurrent((c) => (c + 1) % images.length);
		}, Math.max(1200, intervalMs));
		return () => clearInterval(id);
	}, [autoPlay, paused, images.length, intervalMs]);

	return (
		<div
			className={`relative flex flex-col items-center ${className ?? ''}`}
			onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
			onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
		>
			<div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ aspectRatio }}>
				{transitionType === 'seamless' ? (
					<div
						className="flex h-full w-full"
						style={{
							transform: `translateX(-${current * 100}%)`,
							transition: `transform ${transitionMs}ms ease-out`,
						}}
					>
						{images.map((img, idx) => (
							<div key={img.src} className="relative min-w-full h-full">
								<Image
									src={img.src}
									alt={img.alt}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 50vw"
									priority={idx === 0}
									loading={idx === 0 ? 'eager' : 'lazy'}
								/>
							</div>
						))}
					</div>
				) : (
					images.map((img, idx) => (
						<Image
							key={img.src}
							src={img.src}
							alt={img.alt}
							fill
							className={`absolute inset-0 object-cover ease-out ${
								transitionType === 'morph'
									? `${idx === current ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-[2px]'} transition-[opacity,transform,filter]`
									: `${idx === current ? 'opacity-100' : 'opacity-0'} transition-opacity`
							}`}
							style={{ transitionDuration: `${transitionMs}ms` }}
							sizes="(max-width: 768px) 100vw, 50vw"
							priority={idx === 0}
							loading={idx === 0 ? 'eager' : 'lazy'}
						/>
					))
				)}
			</div>
{/* 			<div className="flex gap-2 mt-4">
				<button
					className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
					onClick={prev}
					aria-label="Previous"
					type="button"
				>
					&#8592;
				</button>
				<button
					className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
					onClick={next}
					aria-label="Next"
					type="button"
				>
					&#8594;
				</button>
			</div> */}
			<div className="flex gap-1 mt-2">
				{images.map((img, idx) => (
					<span
						key={img.src}
						className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
					/>
				))}
			</div>
		</div>
	);
}