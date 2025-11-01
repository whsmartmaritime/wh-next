import type contactMessagesEn from '@messages/en/contact.json';
import FormContent from './FormContent';

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

	// Generate success/error messages
	const successMessage = success ? feedback.success : undefined;
	const errorMessage =
		error === 'server'
			? feedback.errors.server
			: error === 'validation'
				? feedback.errors.validation
				: error === 'rate_limit'
					? feedback.errors.rate_limit
					: undefined;

	// Map invalid fields to error messages
	const fieldErrorMessages =
		errorFields.length > 0
			? errorFields.reduce(
					(acc, field) => {
						// Map 'message' field to 'content' error key
						const errorKey = field === 'message' ? 'content' : field;
						if (errorKey in feedback.errors) {
							acc[field] = [
								feedback.errors[
									errorKey as keyof typeof feedback.errors
								] as string,
							];
						}
						return acc;
					},
					{} as Record<string, string[]>,
				)
			: undefined;

	return (
		<div className={`bg-neutral-50 z-30 ${className}`} id="contact-form">
			<FormContent
				locale={locale}
				placeholder={placeholder}
				submitButton={submitButton}
				successMessage={successMessage}
				errorMessage={errorMessage}
				fieldErrors={fieldErrorMessages}
			/>
		</div>
	);
}
