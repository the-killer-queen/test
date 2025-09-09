'use server';

import { GetActionResult } from '@/types';
import { createClient } from '../server';

export async function removeItemFromStorage(
  ItemPath: string,
  storageName: string,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();

    const { error: removeError } = await supabase.storage
      .from(storageName)
      .remove([ItemPath]);

    if (removeError) return { success: false, error: removeError.message };

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function uploadItemToStorage(
  file: File,
  ItemPath: string,
  storageName: string,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();

    const { error: uploadError } = await supabase.storage
      .from(storageName)
      .upload(ItemPath, file);

    if (uploadError) return { success: false, error: uploadError.message };

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getItemFromStorage(
  file: File,
  ItemPath: string,
  storageName: string,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();

    const { error: uploadError } = await supabase.storage
      .from(storageName)
      .upload(ItemPath, file);

    if (uploadError) return { success: false, error: uploadError.message };

    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
