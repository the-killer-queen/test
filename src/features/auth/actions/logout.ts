'use server';

import { createClient } from '@/supabase/server';
import { ActionResult } from '../schema';

export async function logout(): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      return {
        success: false,
        error: logoutError.message,
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
