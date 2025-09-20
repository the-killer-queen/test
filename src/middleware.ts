import { NextRequest } from 'next/server';
import { updateSession } from './supabase/middleware';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const res = handleI18nRouting(request);

  return updateSession(request, res);
}

export const config = {
  matcher: [
    '/',

    '/(de|en|es)/:path*',

    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
