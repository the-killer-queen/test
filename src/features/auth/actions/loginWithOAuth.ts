import { getURL } from '@/lib/utils';
import { createClient } from '@/supabase/client';
import { GetActionResult } from '@/types';

export async function loginWithGoogle(): Promise<GetActionResult> {
  try {
    const redirectTo = `${getURL()}api/auth/callback`;

    const supabase = createClient();
    const { error: oAuthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (oAuthError)
      return {
        success: false,
        error: oAuthError.message,
      };

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
