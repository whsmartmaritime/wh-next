'use server';

import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation helpers
const validateField = {
	name: (value: string | undefined) =>
		value && value.length >= 2 && value.length <= 100,
	email: (value: string | undefined) =>
		value &&
		value.length <= 254 && // RFC 5321
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
	company: (value: string | undefined) =>
		value && value.length >= 2 && value.length <= 200,
	topic: (value: string | undefined) => !!value,
	message: (value: string | undefined) =>
		value && value.length >= 10 && value.length <= 5000,
};

type FormState = {
	success?: boolean;
	error?: 'validation' | 'server' | 'rate_limit';
	invalidFields?: string[];
};

export async function submitContactForm(
	_prevState: FormState | null,
	formData: FormData,
): Promise<FormState> {
	// Extract form data
	const name = formData.get('name')?.toString().trim() || '';
	const email = formData.get('email')?.toString().trim() || '';
	const company = formData.get('company')?.toString().trim() || '';
	const topic = formData.get('topic')?.toString().trim() || '';
	const message = formData.get('message')?.toString().trim() || '';
	const locale = formData.get('locale')?.toString() || 'en';
	const honeypot = formData.get('website')?.toString() || '';

	// Honeypot check - if filled, it's a bot
	if (honeypot) {
		console.warn('Bot submission detected via honeypot');
		// Silent fail - pretend success to not alert bot
		return { success: true };
	}

	// Rate limiting check
	const rateLimitResult = await checkRateLimit({
		maxRequests: 5, // 5 submissions
		windowMs: 60 * 60 * 1000, // per hour
	});

	if (!rateLimitResult.success) {
		console.warn(
			`Rate limit exceeded. Remaining: ${rateLimitResult.remaining}, Reset at: ${new Date(rateLimitResult.resetAt)}`,
		);
		return { error: 'rate_limit' };
	}

	// Validate all fields
	const invalidFields: string[] = [];

	if (!validateField.name(name)) invalidFields.push('name');
	if (!validateField.email(email)) invalidFields.push('email');
	if (!validateField.company(company)) invalidFields.push('company');
	if (!validateField.topic(topic)) invalidFields.push('topic');
	if (!validateField.message(message)) invalidFields.push('message');

	// Return validation errors
	if (invalidFields.length > 0) {
		return { error: 'validation', invalidFields };
	}

	// Load topic label for email
	const contactMessages = (await import(`@messages/${locale}/contact.json`))
		.default;
	const topicLabel =
		contactMessages.contactForm.placeholder.topic.options[topic] || topic;

	// Sanitize HTML to prevent XSS (basic escaping)
	const escapeHtml = (text: string) =>
		text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');

	// Send email via Resend
	try {
		await resend.emails.send({
			from: 'noreply@mail.wheelhousemaris.com',
			to: 'info@wheelhousemaris.com',
			subject: `New message from ${escapeHtml(name)} - ${escapeHtml(company)}`,
			html: `
	                <h3>CONTACT FORM WEBSITE</h3>
	                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
	                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
	                <p><strong>Company:</strong> ${escapeHtml(company)}</p>
	                <p><strong>Topic:</strong> ${escapeHtml(topicLabel)}</p>
	                <hr>
	                <p><strong>Message:</strong></p>
	                <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
                `,
		});
	} catch (error) {
		console.error('Resend Error:', error);
		return { error: 'server' };
	}

	// Success!
	return { success: true };
}
