'use server';

import { GetActionResult } from '@/types';
import { MenuRow } from '@/types/tables';
import { createClient } from '../server';

export async function getMenu(): Promise<GetActionResult<MenuRow[]>> {
  try {
    const supabase = await createClient();
    const { data: menu, error: menuError } = await supabase
      .from('menu')
      .select('*');

    if (menuError)
      return {
        success: false,
        error: menuError.message,
      };

    return { success: true, data: menu };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
