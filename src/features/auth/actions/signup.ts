'use server';

import { createClient } from '@/supabase/server';
import { ActionResult, SignupFormSchema } from '../schema';

export async function signup(
  formData: SignupFormSchema,
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error: signupError } = await supabase.auth.signUp(formData);

    if (signupError)
      return {
        success: false,
        error: signupError.message,
      };

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
