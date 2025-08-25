'use server';

import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';
import { type LoginFormSchema } from '../schema';

export async function login(formData: LoginFormSchema) {
  try {
    const supabase = await createClient();
    const { error: loginError } =
      await supabase.auth.signInWithPassword(formData);

    if (loginError) throw new Error(loginError.message);

    revalidatePath('/', 'layout');
  } catch (error) {
    throw error;
  }
}
