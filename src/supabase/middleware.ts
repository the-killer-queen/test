import { isAuthRoute, isProtectedRoute } from '@/features/auth';
import { routing } from '@/i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function updateSession(
  request: NextRequest,
  response: NextResponse,
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const pathSegments = pathname.split('/').filter(Boolean);
  const locale = pathSegments[0] || routing.defaultLocale;

  if (pathname === `/${locale}/auth-error`) return response;

  const isPasswordResetPending =
    user?.user_metadata?.password_reset_verified === true;

  if (
    isPasswordResetPending &&
    !pathname.startsWith(`/${locale}/reset-password`)
  )
    return NextResponse.redirect(
      new URL(`/${locale}/reset-password`, request.url),
    );

  // Check for protected routes
  if (
    (isProtectedRoute(pathname, locale) || pathname === `/${locale}`) &&
    !user
  )
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));

  if (
    pathname.startsWith(`/${locale}/reset-password`) &&
    isPasswordResetPending
  )
    return response;

  // Redirect authenticated users away from auth routes
  if (isAuthRoute(pathname, locale) && user)
    return NextResponse.redirect(new URL(`/${locale}`, request.url));

  return response;
}
