import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { defaultLocale, isSupportedLocale, localeCookieName } from '@/config';

export default async function RootPage() {
  const cookieStore = await cookies();
  const preferredLocale = cookieStore.get(localeCookieName)?.value;
  const locale = preferredLocale && isSupportedLocale(preferredLocale) ? preferredLocale : defaultLocale;

  redirect(`/${locale}`);
}
