'use server';

import { createClient } from '@/supabase/server';
import { SignupFormSchema } from '../schema';

export async function signup(formData: SignupFormSchema) {
  try {
    const supabase = await createClient();
    const { error: loginError } = await supabase.auth.signUp(formData);

    if (loginError) throw new Error(loginError.message);
  } catch (error) {
    throw error;
  }
}
