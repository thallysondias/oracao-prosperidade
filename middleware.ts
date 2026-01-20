import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(pt|en|es)/:path*',
    // Exclude API routes, especially webhooks
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
