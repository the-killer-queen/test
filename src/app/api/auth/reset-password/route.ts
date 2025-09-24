import { createClient } from '@/supabase/server';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/reset-password';
  const locale = await getLocale();

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log('💥💥', error, '💥💥');

    if (!error) {
      await supabase.auth.updateUser({
        data: {
          password_reset_verified: true,
        },
      });

      const localizedNext = next.startsWith(`/${locale}`)
        ? next
        : `/${locale}${next === '/' ? '' : next}`;
      redirect({ href: localizedNext, locale });
    }

    if (error) {
      if (error.message.includes('expired')) {
        redirect({ href: '/auth-error?message=expired_link', locale });
      } else if (error.message.includes('used')) {
        redirect({ href: '/auth-error?message=already_used', locale });
      } else {
        redirect({ href: '/auth-error?message=exchange_failed', locale });
      }
    }
  }

  redirect({
    href: '/auth-error?message=Invalid_or_expired_reset_link',
    locale,
  });
}
