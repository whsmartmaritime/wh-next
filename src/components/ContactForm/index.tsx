import { submitContactForm } from '@/app/actions/contact';

type ContactFormProps = {
	placeholder: {
		name: string;
		email: string;
		phone: string;
		subject: string;
		message: string;
	};
	submitButton: string;
	locale: string;
	successMessage?: string;
	errorMessage?: string;
	errors?: {
		name?: string[];
		email?: string[];
		phone?: string[];
		subject?: string[];
		message?: string[];
	};
};

export default function ContactForm({
	placeholder,
	submitButton,
	locale,
	successMessage,
	errorMessage,
	errors,
}: ContactFormProps) {
	return (
		<div className="bg-neutral-50 col-span-12 lg:col-span-6 lg:col-start-7 mx-auto z-30">
			<form action={submitContactForm} aria-label="Contact form">
				<input type="hidden" name="locale" value={locale} />
				{/* Success message */}
				{successMessage && (
					<div
						className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded"
						role="alert"
					>
						{successMessage}
					</div>
				)}

				{/* General error message */}
				{errorMessage && (
					<div
						className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded"
						role="alert"
					>
						{errorMessage}
					</div>
				)}

				{/* Name field */}
				<div>
					<input
						type="text"
						name="name"
						className="w-full border border-neutral-500/20 p-3 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
						placeholder={`${placeholder.name} *`}
						required
						aria-invalid={errors?.name ? 'true' : 'false'}
						aria-describedby={errors?.name ? 'name-error' : undefined}
					/>
					{errors?.name && (
						<p id="name-error" className="mt-1 text-sm text-red-600">
							{errors.name[0]}
						</p>
					)}
				</div>

				{/* Email field */}
				<div>
					<input
						type="email"
						name="email"
						className="w-full border border-neutral-500/20 p-3 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
						placeholder={`${placeholder.email} *`}
						required
						aria-invalid={errors?.email ? 'true' : 'false'}
						aria-describedby={errors?.email ? 'email-error' : undefined}
					/>
					{errors?.email && (
						<p id="email-error" className="mt-1 text-sm text-red-600">
							{errors.email[0]}
						</p>
					)}
				</div>

				{/* Phone field */}
				<div>
					<input
						type="tel"
						name="phone"
						className="w-full border border-neutral-500/20 p-3 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
						placeholder={placeholder.phone}
						aria-invalid={errors?.phone ? 'true' : 'false'}
						aria-describedby={errors?.phone ? 'phone-error' : undefined}
					/>
					{errors?.phone && (
						<p id="phone-error" className="mt-1 text-sm text-red-600">
							{errors.phone[0]}
						</p>
					)}
				</div>

				{/* Subject field */}
				<div>
					<input
						type="text"
						name="subject"
						className="w-full border border-neutral-500/20 p-3 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
						placeholder={placeholder.subject}
						aria-invalid={errors?.subject ? 'true' : 'false'}
						aria-describedby={errors?.subject ? 'subject-error' : undefined}
					/>
					{errors?.subject && (
						<p id="subject-error" className="mt-1 text-sm text-red-600">
							{errors.subject[0]}
						</p>
					)}
				</div>

				{/* Message field */}
				<div>
					<textarea
						name="message"
						rows={6}
						className="w-full border border-neutral-500/20 p-3 focus:outline-none focus:border-l-4 focus:border-l-black"
						placeholder={`${placeholder.message} *`}
						required
						aria-invalid={errors?.message ? 'true' : 'false'}
						aria-describedby={errors?.message ? 'message-error' : undefined}
					/>
					{errors?.message && (
						<p id="message-error" className="mt-1 text-sm text-red-600">
							{errors.message[0]}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="w-full min-h-20 my-8 hover:bg-black hover:text-white border border-neutral-500/20 focus:ring-white transition-all"
				>
					{submitButton}
				</button>
			</form>
		</div>
	);
}
