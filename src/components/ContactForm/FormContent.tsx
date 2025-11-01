'use client';

import { useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions/contact';

type FieldErrors = {
	name?: string[];
	email?: string[];
	company?: string[];
	topic?: string[];
	message?: string[];
};

type FormContentProps = {
	locale: string;
	placeholder: {
		name: string;
		email: string;
		company: string;
		topic: {
			label: string;
			options: Record<string, string>;
		};
		message: string;
	};
	submitButton: string;
	successMessage?: string;
	errorMessage?: string;
	fieldErrors?: FieldErrors;
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
	locale,
	placeholder,
	submitButton,
	successMessage,
	errorMessage,
	fieldErrors,
}: FormContentProps) {
	const formRef = useRef<HTMLFormElement>(null);

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
		<form ref={formRef} action={submitContactForm} aria-label="Contact form">
			{/* Name field */}
			<div>
				<input
					type="text"
					name="name"
					className="w-full border border-neutral-500/20 p-3 h-16 lg:h-22 focus:outline-none focus:border-l-4 focus:border-l-black"
					placeholder={`${placeholder.name} *`}
					required
					aria-invalid={fieldErrors?.name ? 'true' : 'false'}
					aria-describedby={fieldErrors?.name ? 'name-error' : undefined}
				/>
				{fieldErrors?.name && (
					<p id="name-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.name[0]}
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
					aria-invalid={fieldErrors?.email ? 'true' : 'false'}
					aria-describedby={fieldErrors?.email ? 'email-error' : undefined}
				/>
				{fieldErrors?.email && (
					<p id="email-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.email[0]}
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
					aria-invalid={fieldErrors?.company ? 'true' : 'false'}
					aria-describedby={fieldErrors?.company ? 'company-error' : undefined}
				/>
				{fieldErrors?.company && (
					<p id="company-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.company[0]}
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
					aria-invalid={fieldErrors?.topic ? 'true' : 'false'}
					aria-describedby={fieldErrors?.topic ? 'topic-error' : undefined}
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
				{fieldErrors?.topic && (
					<p id="topic-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.topic[0]}
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
					aria-invalid={fieldErrors?.message ? 'true' : 'false'}
					aria-describedby={fieldErrors?.message ? 'message-error' : undefined}
				/>
				{fieldErrors?.message && (
					<p id="message-error" className="mt-1 text-sm text-red-600">
						{fieldErrors.message[0]}
					</p>
				)}
			</div>
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

			<FormSubmitButton label={submitButton} />
		</form>
	);
}
