'use server';

import { createClient } from '../server';

export async function getUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw new Error(userError.message);

    return user;
  } catch (error) {
    throw error;
  }
}
