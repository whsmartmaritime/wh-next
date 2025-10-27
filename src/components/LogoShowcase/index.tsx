'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BackgroundScanline } from '@/components/BackgroundScanline';

type LogoItem = { id: string; src: string; name?: string; alt?: string };
type LogoShowcaseProps = { logos: LogoItem[]; className?: string };

export default function LogoShowcase({
	logos,
	className = '',
}: LogoShowcaseProps) {
	const visibleCount = Math.min(6, logos.length);
	const [idx, setIdx] = useState<number[]>(() =>
		Array.from({ length: visibleCount }, (_, i) => i),
	);
	const [anim, setAnim] = useState<number | null>(null);

	// Reset indices when logos length changes
	useEffect(() => {
		const n = Math.min(6, logos.length);
		setIdx(Array.from({ length: n }, (_, i) => i));
	}, [logos]);

	// Simple swap loop every 3s with a short pre-swap animation
	useEffect(() => {
		if (logos.length <= 1) return;
		const interval = window.setInterval(() => {
			const n = Math.min(6, logos.length);
			const slot = Math.floor(Math.random() * n);
			setAnim(slot);
			window.setTimeout(() => {
				setIdx((cur) => {
					const next = cur.slice(0, n);
					const visible = new Set(next);
					const pool = logos.map((_, i) => i).filter((i) => !visible.has(i));
					if (pool.length) {
						next[slot] = pool[Math.floor(Math.random() * pool.length)];
					} else if (next.length > 1) {
						let j = Math.floor(Math.random() * next.length);
						if (j === slot) j = (j + 1) % next.length;
						[next[slot], next[j]] = [next[j], next[slot]];
					}
					return next;
				});
			}, 300);
			window.setTimeout(() => setAnim(null), 700);
		}, 3000);
		return () => window.clearInterval(interval);
	}, [logos]);

	const n = Math.min(6, logos.length);
	if (n === 0) return null;
	const slots = idx.slice(0, n);

	return (
		<div className={`relative ${className}`}>
			<div className="grid grid-cols-4 lg:grid-cols-8 gap-0 mx-auto">
				<div className="aspect-square invisible" />
				{slots.map((logoIdx, i) => {
					const logo = logos[logoIdx];
					return (
						<div key={`slot-${i}`} className="relative">
							<div
								className={`relative aspect-square border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 `}
							>
								{/* Scanline overlay, fades in when animating */}
								<BackgroundScanline
									className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ${
										anim === i ? 'opacity-100' : ''
									}`}
									crosshairs={['top-right', 'bottom-left']}
									opacity={0.1}
								/>
								{logo ? (
									<Image
										src={logo.src}
										alt={logo.alt || logo.name || 'Partner logo'}
										fill
										className={`object-contain p-4 md:p-8 transition-[filter,opacity,transform] duration-500 ${
											anim === i ? 'blur-[16px] opacity-0' : 'opacity-100'
										}`}
										loading="eager"
										sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
										draggable={false}
									/>
								) : (
									<div className="w-full h-full" />
								)}
							</div>
						</div>
					);
				})}
				<div className="aspect-square invisible" />
			</div>
		</div>
	);
}
