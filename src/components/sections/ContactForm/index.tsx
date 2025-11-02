import type contactMessagesEn from '@messages/en/contact.json';
import FormContent from './FormContent';

type ContactFormProps = {
	contactMessages: typeof contactMessagesEn;
	locale: string;
	className?: string;
};

export default function ContactForm({
	contactMessages,
	locale,
	className,
}: ContactFormProps) {
	return (
		<div className={`bg-neutral-50 z-30 ${className}`}>
			<FormContent contactMessages={contactMessages} locale={locale} />
		</div>
	);
}
