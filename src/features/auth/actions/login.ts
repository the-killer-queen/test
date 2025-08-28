'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/supabase/server';
import { ActionResult, LoginFormSchema } from '../schema';

export async function login(formData: LoginFormSchema): Promise<ActionResult> {
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
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
