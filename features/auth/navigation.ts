import { defaultLocale, isSupportedLocale, type Locale } from '@/shared/config/locales';

export function resolveLocaleFromPath(pathname?: string): Locale {
  const segment = pathname?.split('/')[1];
  return segment && isSupportedLocale(segment) ? segment : defaultLocale;
}

export function getLoginPath(locale: Locale) {
  return `/${locale}/login`;
}

export function getHomePath(locale: Locale) {
  return `/${locale}`;
}
