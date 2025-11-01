'use server';

import { redirect } from 'next/navigation';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation helpers
const validateField = {
	name: (value: string | undefined) => value && value.length >= 2,
	email: (value: string | undefined) =>
		value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
	company: (value: string | undefined) => value && value.length >= 2,
	topic: (value: string | undefined) => !!value,
	message: (value: string | undefined) => value && value.length >= 10,
};

export async function submitContactForm(formData: FormData) {
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
		redirect(`/${locale}/contact?success=true`);
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
		redirect(`/${locale}/contact?error=rate_limit`);
	}

	// Validate all fields
	const invalidFields: string[] = [];

	if (!validateField.name(name)) invalidFields.push('name');
	if (!validateField.email(email)) invalidFields.push('email');
	if (!validateField.company(company)) invalidFields.push('company');
	if (!validateField.topic(topic)) invalidFields.push('topic');
	if (!validateField.message(message)) invalidFields.push('message');

	// Redirect if validation fails
	if (invalidFields.length > 0) {
		const params = new URLSearchParams({
			error: 'validation',
			fields: invalidFields.join(','),
		});
		redirect(`/${locale}/contact?${params.toString()}`);
	}

	// Load topic label for email
	const contactMessages = (await import(`@messages/${locale}/contact.json`))
		.default;
	const topicLabel =
		contactMessages.contactForm.placeholder.topic.options[topic] || topic;

	// Send email via Resend
	try {
		await resend.emails.send({
			from: 'noreply@mail.wheelhousemaris.com',
			to: 'info@wheelhousemaris.com',
			subject: `New message from ${name} - ${company}`,
			html: `
	                <h3>CONTACT FORM WEBSITE</h3>
	                <p><strong>Name:</strong> ${name}</p>
	                <p><strong>Email:</strong> ${email}</p>
	                <p><strong>Company:</strong> ${company}</p>
	                <p><strong>Topic:</strong> ${topicLabel}</p>
	                <hr>
	                <p><strong>Message:</strong></p>
	                <p>${message}</p>
                `,
		});
	} catch (error) {
		console.error('Resend Error:', error);
		redirect(`/${locale}/contact?error=server`);
	}

	// Success redirect
	redirect(`/${locale}/contact?success=true`);
}
