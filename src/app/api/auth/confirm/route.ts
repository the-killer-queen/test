import { type EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/supabase/server';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token');
  const type = searchParams.get('type') as EmailOtpType | null;
  const locale = await getLocale();

  const next = '/';

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (!error) redirect({ href: next, locale });

    if (error) {
      if (error.message.includes('expired')) {
        redirect({ href: '/auth-error?message=expired_link', locale });
      } else if (error.message.includes('used')) {
        redirect({ href: '/auth-error?message=already_used', locale });
      } else {
        redirect({ href: '/auth-error?message=verification_failed', locale });
      }
    }
  }

  redirect({ href: '/auth-error?message=invalid_or_missing_token', locale });
}
