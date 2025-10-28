interface LogoSvgProps {
	className?: string;
	locale: string;
}

export default async function LogoSvg({
	className = 'h-12 w-auto',
	locale,
}: LogoSvgProps) {
	const commonMessages = (await import(`@messages/${locale}/common.json`))
		.default;

	return (
		<svg
			viewBox="0 0 100 25"
			className={`text-current ${className}`}
			role="img"
			aria-label={commonMessages.brand.logo.alt}
			aria-labelledby="logoTitle logoDesc"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title id="logoTitle">{commonMessages.brand.logo.title}</title>
			<desc id="logoDesc">{commonMessages.brand.logo.desc}</desc>
			<text
				x="0.29"
				y="14.97"
				fontSize="16.95"
				fontFamily="Helvetica, Arial, sans-serif"
				fontWeight="700"
				fill="currentColor"
			>
				Wheelhouse
			</text>
			<text
				x="69.46"
				y="24.66"
				fontSize="6.96"
				fontFamily="Helvetica, Arial, sans-serif"
				fontWeight="700"
				fill="currentColor"
				letterSpacing="2"
			>
				MARIS
			</text>
			<rect
				x="0.29"
				y="19.82"
				width="21.19"
				height="4.84"
				fill="currentColor"
			/>
			<rect
				x="23.53"
				y="19.82"
				width="12.71"
				height="4.84"
				fill="currentColor"
			/>
			<rect
				x="40.48"
				y="19.82"
				width="7.87"
				height="4.84"
				fill="currentColor"
			/>
			<rect
				x="52.77"
				y="19.82"
				width="4.84"
				height="4.84"
				fill="currentColor"
			/>
			<rect
				x="63.43"
				y="19.82"
				width="3.03"
				height="4.84"
				fill="currentColor"
			/>
		</svg>
	);
}
