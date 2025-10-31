'use server';

import { redirect } from 'next/navigation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
	// Extract and validate form data
	const name = formData.get('name')?.toString().trim();
	const email = formData.get('email')?.toString().trim();
	const company = formData.get('company')?.toString().trim();
	const topic = formData.get('topic')?.toString().trim();
	const message = formData.get('message')?.toString().trim();
	const locale = formData.get('locale')?.toString() || 'en';

	const errors: string[] = [];

	// Validation
	if (!name || name.length < 2) {
		errors.push('name');
	}

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.push('email');
	}

	if (!company || company.length < 2) {
		errors.push('company');
	}

	if (!topic) {
		errors.push('topic');
	}

	if (!message || message.length < 10) {
		errors.push('message');
	}

	// If there are validation errors, redirect with error params
	if (errors.length > 0) {
		const params = new URLSearchParams({
			error: 'validation',
			fields: errors.join(','),
		});
		redirect(`/${locale}/contact?${params.toString()}#contact-form`);
	}

	// Load topic labels for email
	const contactMessages = (await import(`@messages/${locale}/contact.json`))
		.default;
	const topicLabel =
		contactMessages.contactForm.placeholder.topic.options[topic as string] ||
		topic;

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
		redirect(`/${locale}/contact?error=server#contact-form`);
	}

	// Success - redirect with success message
	redirect(`/${locale}/contact?success=true#contact-form`);
}
