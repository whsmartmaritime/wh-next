import type contactMessagesEn from '@messages/en/contact.json';
import { submitContactForm } from '@/app/actions/contact';

type ContactFormProps = {
	contactMessages: typeof contactMessagesEn;
	locale: string;
	success?: boolean;
	error?: string;
	errorFields?: string[];
	className?: string;
};

export default function ContactForm({
	contactMessages,
	locale,
	success,
	error,
	errorFields = [],
	className,
}: ContactFormProps) {
	const { placeholder, submitButton, feedback } = contactMessages.contactForm;

	// Generate error/success messages
	const successMessage = success ? feedback.success : undefined;
	const errorMessage =
		error === 'server'
			? feedback.errors.server
			: error === 'validation'
				? feedback.errors.validation
				: undefined;

	const errors =
		errorFields.length > 0
			? {
					name: errorFields.includes('name')
						? [feedback.errors.name]
						: undefined,
					email: errorFields.includes('email')
						? [feedback.errors.email]
						: undefined,
					company: errorFields.includes('company')
						? [feedback.errors.company]
						: undefined,
					topic: errorFields.includes('topic')
						? [feedback.errors.topic]
						: undefined,
					message: errorFields.includes('message')
						? [feedback.errors.content]
						: undefined,
				}
			: undefined;

	return (
		<div className={`bg-neutral-50 z-30 ${className}`}>
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

				{/* Company field */}
				<div>
					<input
						type="text"
						name="company"
						className="w-full border border-neutral-500/20 p-3 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
						placeholder={`${placeholder.company} *`}
						required
						aria-invalid={errors?.company ? 'true' : 'false'}
						aria-describedby={errors?.company ? 'company-error' : undefined}
					/>
					{errors?.company && (
						<p id="company-error" className="mt-1 text-sm text-red-600">
							{errors.company[0]}
						</p>
					)}
				</div>

				{/* Topic dropdown field */}
				<div>
					<select
						name="topic"
						className="w-full border border-neutral-500/20 p-3 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black bg-white"
						required
						defaultValue=""
						aria-invalid={errors?.topic ? 'true' : 'false'}
						aria-describedby={errors?.topic ? 'topic-error' : undefined}
					>
						<option value="" disabled>
							{placeholder.topic.label} *
						</option>
						{Object.entries(placeholder.topic.options).map(([key, label]) => (
							<option key={key} value={key}>
								{label}
							</option>
						))}
					</select>
					{errors?.topic && (
						<p id="topic-error" className="mt-1 text-sm text-red-600">
							{errors.topic[0]}
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
