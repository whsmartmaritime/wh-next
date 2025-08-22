import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
    const activeLocale = hasLocale(routing.locales, requested)
      ? (requested as string)
      : routing.defaultLocale;
 
    // Load messages JSON for the active locale (fallback to default)
    let messages: Record<string, unknown>;
    try {
      messages = (await import(`../../messages/${activeLocale}.json`)).default;
    } catch {
      messages = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
    }

    return {
      locale: activeLocale,
      messages
    };
});