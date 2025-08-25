import { getURL } from '@/lib/utils';
import { createClient } from '@/supabase/client';

export async function loginWithGoogle() {
  try {
    const redirectTo = `${getURL()}api/auth/callback`;

    const supabase = createClient();
    const { error: oAuthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (oAuthError) throw new Error(oAuthError.message);
  } catch (error) {
    throw error;
  }
}
