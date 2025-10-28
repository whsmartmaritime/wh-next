interface ContactInfoProps {
	className?: string;
	locale: string;
}

export default async function ContactInfo({
	className = '',
	locale,
}: ContactInfoProps) {
	const aboutMessages = (await import(`@messages/${locale}/about.json`))
		.default;

	return (
		<div className={`space-y-4 ${className}`}>
			<div className="flex items-start space-x-3">
				<p>{aboutMessages.contact.name}</p>
			</div>
			<div className="flex items-start space-x-3">
				<svg
					className="w-5 h-5 text-nature-500 mt-1 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				<p>{aboutMessages.contact.address}</p>
			</div>

			<div className="flex items-center space-x-3">
				<svg
					className="w-5 h-5 text-nature-500 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
					/>
				</svg>
				<p>{aboutMessages.contact.phone.display}</p>
			</div>

			<div className="flex items-center space-x-3">
				<svg
					className="w-5 h-5 text-nature-500 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
				<p>{aboutMessages.contact.email}</p>
			</div>
		</div>
	);
}
