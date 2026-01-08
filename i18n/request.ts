import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const routeLocale = await requestLocale;
  const store = await cookies();
  const cookieLocale = store.get('locale')?.value;
  const locale = routeLocale || cookieLocale || 'es';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
