import Image from 'next/image';
import type { ReactNode } from 'react';
import AnimatedLink from '../AnimatedLink';

interface HeroProps {
	title: ReactNode;
	subtitle: ReactNode;
	images: {
		back: {
			src: string;
			alt: string;
		};
		fore?: {
			src: string;
			alt: string;
		};
	};
	ctas?: {
		label: string;
		href: string;
	}[];
	isHome?: boolean;
	className?: string;
}
export default function Hero({
	title,
	subtitle,
	images,
	ctas = [],
	className = '',
}: HeroProps) {
	return (
		<div className={`relative grid grid-cols-12 items-center ${className}`}>
			<div className="col-span-12 lg:col-span-3 flex flex-col gap-8">
				<div className="text-3xl lg:text-5xl xl:text-7xl font-semibold leading-tight tracking-tight text-balance w-full lg:w-[150%]">
					{title}
				</div>
				<div className="text-xl lg:text-2xl font-medium text-muted-foreground">
					{subtitle}
				</div>
				{ctas.length > 0 && (
					<div className="relative flex flex-col sm:flex-row lg:flex-col">
						{ctas.map((cta) => (
							<AnimatedLink
								theme="dark"
								key={cta.href}
								href={cta.href}
								className={'w-full min-h-20'}
							>
								{cta.label}
							</AnimatedLink>
						))}
					</div>
				)}
			</div>

			<div className="relative col-span-12 lg:col-span-7 lg:col-start-6 mt-8">
				<div className="relative w-full lg:w-[calc(var(--column)*10)] aspect-[16/9] ">
					{images.fore && (
						<div
							className={
								'absolute top-0 right-0 z-10 lg:w-[calc(var(--column)*8.5)] h-auto   border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden ' +
								(images.back ? 'w-[calc(var(--column)*10)]' : 'w-full')
							}
						>
							<div className=" relative w-full rounded-md overflow-hidden aspect-[16/9]">
								<Image
									src={images.fore.src}
									alt={images.fore.alt}
									fill
									sizes="(min-width:1280px) 750px, (min-width:1024px) 600px, 70vw"
									className="object-cover"
									priority
								/>
							</div>
						</div>
					)}

					{images.back && (
						<div
							className={
								'absolute bottom-0 left-0 z-0 lg:w-[calc(var(--column)*8.5)] h-auto border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden ' +
								(images.fore ? 'w-[calc(var(--column)*10)]' : 'w-full')
							}
						>
							<div className="relative w-full rounded-md border border-white/5 shadow-[0px_0rem_0.25rem_0rem_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/9]">
								<Image
									src={images.back.src}
									alt={images.back.alt}
									fill
									sizes="(min-width:1280px) 520px, (min-width:1024px) 420px, 60vw"
									className="object-cover"
									priority
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
