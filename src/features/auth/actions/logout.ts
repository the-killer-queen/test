'use server';

import { createClient } from '@/supabase/server';
import { GetActionResult } from '@/types';

export async function logout(): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      return {
        success: false,
        error: logoutError.message,
      };
    }

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
