import Image from 'next/image';
import type { ReactNode } from 'react';
import AnimatedLink from '@/components/AnimatedLink';

interface HeroPageProps {
	title: ReactNode;
	subtitle: ReactNode;
	images: {
		back: {
			src: string;
			alt: string;
		};
		fore: {
			src: string;
			alt: string;
		};
	};
	ctas?: {
		label: string;
		href: string;
	}[];
	className?: string;
}
export default function HeroPage({
	title,
	subtitle,
	images,
	ctas = [],
	className = '',
}: HeroPageProps) {
	return (
		<div
			className={`relative grid grid-cols-12
         ${className}`}
		>
			<div className="col-span-12 lg:col-span-3 flex flex-col justify-center gap-8">
				<div className="text-2xl lg:text-4xl xl:text-6xl font-semibold leading-tight tracking-tight text-balance w-full lg:w-[175%]">
					{title}
				</div>
				<div className="text-lg lg:text-xl font-medium">{subtitle}</div>
				{ctas.length > 0 && (
					<div className="relative flex flex-col sm:flex-row lg:flex-col">
						{ctas.map((cta) => (
							<AnimatedLink
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

			<div className="col-span-12 lg:col-span-7 lg:col-start-6">
				<div
					className="flex items-center justify-center w-full p-8 lg:p-0 lg:w-[calc(var(--column)*8)] aspect-[16/10] relative before:content-[''] before:absolute 
        before:top-0 before:bottom-0 before:w-full lg:before:w-3/4 
        before:bg-[url('/images/decorative/gradient-square.webp')] 
        before:bg-no-repeat 
        before:bg-right before:bg-cover"
				>
					<div className="relative w-full aspect-[16/9] ">
						<Image
							src={images.back.src}
							alt={images.back.alt}
							width={1600}
							height={900}
							sizes="(min-width:1280px) 50vw, 70vw"
							className="absolute object-cover top-0 left-0 origin-top-left scale-65"
							priority
						/>
						<Image
							src={images.fore.src}
							alt={images.fore.alt}
							width={1600}
							height={900}
							sizes="(min-width:1280px) 50vw, 70vw"
							className="absolute object-cover bottom-0 right-0 origin-bottom-right scale-70"
							priority
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
