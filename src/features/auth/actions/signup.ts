'use server';

import { createClient } from '@/supabase/server';
import { GetActionResult } from '@/types';
import { SignupFormSchema } from '../schema';

export async function signup(
  formData: SignupFormSchema,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const { error: signupError } = await supabase.auth.signUp(formData);

    if (signupError)
      return {
        success: false,
        error: signupError.message,
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
