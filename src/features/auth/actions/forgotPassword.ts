'use server';

import { getURL } from '@/lib/utils';
import { createClient } from '@/supabase/server';

export async function forgotPassword(email: string) {
  try {
    const redirectTo = `${getURL()}api/auth/reset-password`;

    const supabase = await createClient();
    const { error: forgotPasswordError } =
      await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (forgotPasswordError) throw new Error(forgotPasswordError.message);
  } catch (error) {
    throw error;
  }
}

export async function oneTimeResetPasword(newPassword: string) {
  try {
    const supabase = await createClient();
    const { error: resetPassError } = await supabase.auth.updateUser({
      password: newPassword,
      data: { password_reset_verified: null },
    });

    if (resetPassError) throw new Error(resetPassError.message);

    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) throw new Error(signOutError.message);
  } catch (error) {
    throw error;
  }
}
