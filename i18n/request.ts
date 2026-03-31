import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, isSupportedLocale, localeCookieName } from '@/shared/config/locales';

export default getRequestConfig(async ({requestLocale}) => {
  const routeLocale = await requestLocale;
  const store = await cookies();
  const cookieLocale = store.get(localeCookieName)?.value;
  const locale =
    (routeLocale && isSupportedLocale(routeLocale) && routeLocale) ||
    (cookieLocale && isSupportedLocale(cookieLocale) && cookieLocale) ||
    defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
