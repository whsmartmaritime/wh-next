'use client';

import type contactMessagesEn from '@messages/en/contact.json';
import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions/contact';

type FormContentProps = {
	contactMessages: typeof contactMessagesEn;
	locale: string;
};

function FormSubmitButton({ label }: { label: string }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="w-full min-h-20 my-8 hover:bg-black hover:text-white border border-neutral-500/20 focus:ring-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{pending ? (
				<span className="flex items-center justify-center gap-2">
					<svg
						className="animate-spin h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						role="img"
						aria-label="Loading"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					Sending...
				</span>
			) : (
				label
			)}
		</button>
	);
}

export default function FormContent({
	contactMessages,
	locale,
}: FormContentProps) {
	const [state, formAction] = useActionState(submitContactForm, null);
	const formRef = useRef<HTMLFormElement>(null);

	const { placeholder, submitButton, feedback } = contactMessages.contactForm;

	// Generate messages from state
	const successMessage = state?.success ? feedback.success : undefined;
	const errorMessage = state?.error ? feedback.errors[state.error] : undefined;

	// Map invalid fields to error messages
	const fieldErrors = state?.invalidFields?.reduce(
		(acc, field) => {
			const errorKey = field === 'message' ? 'content' : field;
			if (errorKey in feedback.errors) {
				acc[field] = [
					feedback.errors[errorKey as keyof typeof feedback.errors] as string,
				];
			}
			return acc;
		},
		{} as Record<string, string[]>,
	);

	// Auto-scroll to form when there's a message
	useEffect(() => {
		if ((successMessage || errorMessage) && formRef.current) {
			formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [successMessage, errorMessage]);

	// Clear form on success
	useEffect(() => {
		if (successMessage && formRef.current) {
			formRef.current.reset();
		}
	}, [successMessage]);

	return (
		<form ref={formRef} action={formAction} aria-label="Contact form">
			{/* Name field */}
			<div className="relative">
				<input
					type="text"
					name="name"
					id="name"
					maxLength={100}
					className="peer w-full border border-neutral-500/20 p-3 pt-6 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
					placeholder=" "
					required
					aria-invalid={fieldErrors?.name ? 'true' : 'false'}
					aria-describedby={fieldErrors?.name ? 'name-error' : undefined}
				/>
				<label
					htmlFor="name"
					className="absolute left-3 top-1/2 -translate-y-1/2  transition-all duration-200 pointer-events-none peer-focus:top-5 peer-focus:text-sm peer-focus:text-black peer-[:not(:placeholder-shown)]:top-5 peer-[:not(:placeholder-shown)]:text-sm "
				>
					{placeholder.name} *
				</label>
				{fieldErrors?.name && (
					<p id="name-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.name[0]}
					</p>
				)}
			</div>

			{/* Email field */}
			<div className="relative">
				<input
					type="email"
					name="email"
					id="email"
					maxLength={254}
					className="peer w-full border border-neutral-500/20 p-3 pt-6 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
					placeholder=" "
					required
					aria-invalid={fieldErrors?.email ? 'true' : 'false'}
					aria-describedby={fieldErrors?.email ? 'email-error' : undefined}
				/>
				<label
					htmlFor="email"
					className="absolute left-3 top-1/2 -translate-y-1/2  transition-all duration-200 pointer-events-none peer-focus:top-5 peer-focus:text-sm peer-focus:text-black peer-[:not(:placeholder-shown)]:top-5 peer-[:not(:placeholder-shown)]:text-sm "
				>
					{placeholder.email} *
				</label>
				{fieldErrors?.email && (
					<p id="email-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.email[0]}
					</p>
				)}
			</div>

			{/* Company field */}
			<div className="relative">
				<input
					type="text"
					name="company"
					id="company"
					maxLength={200}
					className="peer w-full border border-neutral-500/20 p-3 pt-6 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
					placeholder=" "
					required
					aria-invalid={fieldErrors?.company ? 'true' : 'false'}
					aria-describedby={fieldErrors?.company ? 'company-error' : undefined}
				/>
				<label
					htmlFor="company"
					className="absolute left-3 top-1/2 -translate-y-1/2  transition-all duration-200 pointer-events-none peer-focus:top-5 peer-focus:text-sm peer-focus:text-black peer-[:not(:placeholder-shown)]:top-5 peer-[:not(:placeholder-shown)]:text-sm "
				>
					{placeholder.company} *
				</label>
				{fieldErrors?.company && (
					<p id="company-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.company[0]}
					</p>
				)}
			</div>

			{/* Topic dropdown field */}
			<div className="relative">
				<select
					name="topic"
					id="topic"
					className="peer w-full border border-neutral-500/20 p-3 pt-6 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black bg-white appearance-none"
					required
					defaultValue=""
					aria-invalid={fieldErrors?.topic ? 'true' : 'false'}
					aria-describedby={fieldErrors?.topic ? 'topic-error' : undefined}
				>
					<option value="" disabled></option>
					{Object.entries(placeholder.topic.options).map(([key, label]) => (
						<option key={key} value={key}>
							{label}
						</option>
					))}
				</select>
				<label
					htmlFor="topic"
					className="absolute left-3 top-1/2 -translate-y-1/2  transition-all duration-200 pointer-events-none peer-focus:top-5 peer-focus:text-sm peer-focus:text-black peer-[:not(:invalid)]:top-5 peer-[:not(:invalid)]:text-sm peer-[:not(:invalid)]:text-neutral-600"
				>
					{placeholder.topic.label} *
				</label>
				{fieldErrors?.topic && (
					<p id="topic-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.topic[0]}
					</p>
				)}
			</div>

			{/* Message field */}
			<div className="relative">
				<textarea
					name="message"
					id="message"
					maxLength={5000}
					className="peer w-full border border-neutral-500/20 p-3 pt-8 focus:outline-none focus:border-l-4 focus:border-l-black [field-sizing:content] min-h-[8lh]"
					placeholder=" "
					required
					aria-invalid={fieldErrors?.message ? 'true' : 'false'}
					aria-describedby={fieldErrors?.message ? 'message-error' : undefined}
				/>
				<label
					htmlFor="message"
					className="absolute left-3 top-5  transition-all duration-200 pointer-events-none peer-focus:top-3 peer-focus:text-sm peer-focus:text-black peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-sm "
				>
					{placeholder.message} *
				</label>
				{fieldErrors?.message && (
					<p id="message-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.message[0]}
					</p>
				)}
			</div>
			<input type="hidden" name="locale" value={locale} />

			{/* Honeypot field - hidden from users, bots will fill it */}
			<input
				type="text"
				name="website"
				className="absolute left-[-9999px] w-0 h-0 opacity-0"
				tabIndex={-1}
				autoComplete="off"
				aria-hidden="true"
			/>

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

			<FormSubmitButton label={submitButton} />
		</form>
	);
}
