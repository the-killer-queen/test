'use server';

import { createClient } from '@/supabase/server';
import { GetActionResult } from '@/types';
import { revalidatePath } from 'next/cache';
import { LoginFormSchema } from '../schema';

export async function login(
  formData: LoginFormSchema,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const { error: loginError } =
      await supabase.auth.signInWithPassword(formData);

    if (loginError)
      return {
        success: false,
        error: loginError.message,
      };

    revalidatePath('/', 'layout');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
