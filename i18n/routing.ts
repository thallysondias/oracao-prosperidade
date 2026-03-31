import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { defaultLocale, localeCookieName, locales } from '@/shared/config/locales';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeCookie: {
    name: localeCookieName,
    maxAge: 60 * 60 * 24 * 365
  }
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
