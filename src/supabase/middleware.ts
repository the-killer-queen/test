import { isAuthRoute, isProtectedRoute } from '@/features/auth/lib/utils';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseRes = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookieToSet) {
          cookieToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseRes = NextResponse.next({ request });
          cookieToSet.forEach(({ name, value, options }) =>
            supabaseRes.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  if (pathname === '/auth-error') return supabaseRes;

  const isPasswordResetPending =
    user?.user_metadata?.password_reset_verified === true;

  if (isPasswordResetPending && !pathname.startsWith('/reset-password'))
    return NextResponse.redirect(new URL('/reset-password', request.url));

  if ((isProtectedRoute(pathname) || pathname === '/') && !user)
    return NextResponse.redirect(new URL('/sign-in', request.url));

  if (pathname.startsWith('/reset-password') && isPasswordResetPending)
    return supabaseRes;

  if (isAuthRoute(pathname) && user)
    return NextResponse.redirect(new URL('/', request.url));

  return supabaseRes;
}
