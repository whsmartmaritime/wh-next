import { type NextRequest, NextResponse } from 'next/server';
import intlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if pathname is missing locale
	const pathnameIsMissingLocale = routing.locales.every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	);

	if (pathnameIsMissingLocale) {
		// Get locale from next-intl (handles detection)
		const locale = routing.defaultLocale;

		// Create redirect with 308 status
		return NextResponse.redirect(
			new URL(`/${locale}${pathname}`, request.url),
			308, // Permanent Redirect
		);
	}

	// Let next-intl handle the rest
	return intlMiddleware(routing)(request);
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
