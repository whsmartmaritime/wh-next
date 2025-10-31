'use server';

import { redirect } from 'next/navigation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
	// Extract and validate form data
	const name = formData.get('name')?.toString().trim();
	const email = formData.get('email')?.toString().trim();
	const phone = formData.get('phone')?.toString().trim();
	const subject = formData.get('subject')?.toString().trim();
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

	if (phone && !/^[+]?[\d\s()-]{8,}$/.test(phone)) {
		errors.push('phone');
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

	// Send email via Resend
	try {
		await resend.emails.send({
			from: 'noreply@mail.wheelhousemaris.com',
			to: 'info@wheelhousemaris.com',
			subject: `New message from ${name} - ${email}`,
			html: `
                <h3>CONTACT FORM SUBMISSION</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
		});

		// Success - redirect with success message
		redirect(`/${locale}/contact?success=true#contact-form`);
	} catch (error) {
		console.error('Resend Error:', error);
		redirect(`/${locale}/contact?error=server#contact-form`);
	}
}
