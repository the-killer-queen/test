'use server';

import { getURL } from '@/lib/utils';
import { createClient } from '@/supabase/server';
import { ChangePasswordSchema } from '../schema';

type ActionResult = {
  success: boolean;
  error?: string;
};

export async function requestPasswordChange(
  formData: ChangePasswordSchema,
): Promise<ActionResult> {
  try {
    const redirectTo = `${getURL()}api/auth/reset-password`;

    const supabase = await createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      { redirectTo },
    );

    if (resetError) {
      return {
        success: false,
        error: resetError.message,
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
