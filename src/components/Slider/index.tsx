

"use client";
import Image from 'next/image';
import { useState } from 'react';

export type SliderImage = {
	src: string;
	alt: string;
};

export type SliderProps = {
	images: SliderImage[];
	aspectRatio?: string; // e.g. '4/3', '16/9'
	className?: string;
};

export default function Slider({ images, aspectRatio = '4/3', className }: SliderProps) {
	const [current, setCurrent] = useState(0);
	const next = () => setCurrent((c) => (c + 1) % images.length);
	const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

	return (
		<div className={`relative flex flex-col items-center ${className ?? ''}`}>
			<div className={`w-full aspect-[${aspectRatio}] rounded-lg overflow-hidden shadow-lg`}>
				<Image
					src={images[current].src}
					alt={images[current].alt}
					fill
					className="object-cover transition-all duration-500"
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>
			<div className="flex gap-2 mt-4">
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
			</div>
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