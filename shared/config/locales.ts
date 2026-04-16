export const defaultLocale = 'en';
export const locales = ['pt', 'en', 'es', 'fr'] as const;
export const localeCookieName = 'NEXT_LOCALE';

export type Locale = (typeof locales)[number];

export function isSupportedLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
