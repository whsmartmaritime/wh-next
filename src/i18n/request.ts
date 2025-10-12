import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { loadMessages } from "./loadMessages";
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const activeLocale = hasLocale(routing.locales, requested)
    ? (requested as string)
    : routing.defaultLocale;
  // Load messages for the active locale (modular only, throws if missing)
  const messages = await loadMessages(activeLocale);

  return {
    locale: activeLocale,
    messages,
  };
});
