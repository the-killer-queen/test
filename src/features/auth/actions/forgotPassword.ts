'use server';

import { getURL } from '@/lib/utils';
import { createClient } from '@/supabase/server';
import { ActionResult } from '../schema';

export async function forgotPassword(email: string): Promise<ActionResult> {
  try {
    const redirectTo = `${getURL()}api/auth/reset-password`;

    const supabase = await createClient();
    const { error: forgotPasswordError } =
      await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (forgotPasswordError) {
      return {
        success: false,
        error: forgotPasswordError.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function oneTimeResetPassword(
  newPassword: string,
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error: resetPassError } = await supabase.auth.updateUser({
      password: newPassword,
      data: { password_reset_verified: null },
    });

    if (resetPassError) {
      return {
        success: false,
        error: resetPassError.message,
      };
    }

    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      return {
        success: false,
        error: signOutError.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
