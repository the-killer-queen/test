import { type EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(reuqest: Request) {
  const { searchParams } = new URL(reuqest.url);
  const token_hash = searchParams.get('token');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = '/';

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (!error) redirect(next);

    if (error) {
      if (error.message.includes('expired')) {
        redirect('/auth-error?message=expired_link');
      } else if (error.message.includes('used')) {
        redirect('/auth-error?message=already_used');
      } else {
        redirect('/auth-error?message=verification_failed');
      }
    }
  }

  redirect('/auth-error?message=invalid_or_missing_token');
}
