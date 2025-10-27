import intlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default intlMiddleware(routing);

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
