import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/reset-password';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      await supabase.auth.updateUser({
        data: {
          password_reset_verified: true,
        },
      });
      redirect(next);
    }

    if (error) {
      if (error.message.includes('expired')) {
        redirect('/auth-error?message=expired_link');
      } else if (error.message.includes('used')) {
        redirect('/auth-error?message=already_used');
      } else {
        redirect('/auth-error?message=exchange_failed');
      }
    }
  }

  redirect('/auth-error?message=Invalid_or_expired_reset_link');
}
