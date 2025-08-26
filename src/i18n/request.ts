import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {loadMessages} from './loadMessages';
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
    const activeLocale = hasLocale(routing.locales, requested)
      ? (requested as string)
      : routing.defaultLocale;
  // Load messages for the active locale (supports modular files and monolithic fallback)
  const messages = await loadMessages(activeLocale, { defaultLocale: routing.defaultLocale });

    return {
      locale: activeLocale,
      messages
    };
});