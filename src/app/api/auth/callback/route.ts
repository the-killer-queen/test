import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  const pathname = new URL(request.url).pathname;
  const locale = pathname.split('/')[1] || 'en';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const forwardedHost = request.headers.get('x-forwarded-host');

      const localizedNext = next.startsWith(`/${locale}`)
        ? next
        : `/${locale}${next}`;

      if (isLocalEnv) return NextResponse.redirect(`${origin}${localizedNext}`);
      else if (forwardedHost)
        return NextResponse.redirect(
          `https://${forwardedHost}${localizedNext}`,
        );
      else return NextResponse.redirect(`${origin}${localizedNext}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/${locale}/auth-error?message=invalid_or_missing_code`,
  );
}
