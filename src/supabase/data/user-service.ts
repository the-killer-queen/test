'use server';

import { GetActionResult } from '@/types';
import { createClient } from '../server';
import { removeItemFromStorage, uploadItemToStorage } from './global-service';
import { handleImageCompression } from '@/lib/actions';
import { revalidatePath } from 'next/cache';
import { UserMetadata } from '@supabase/supabase-js';

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

export async function updateProfile(
  formData: UserMetadata,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const user = await getUser();

    if (!user)
      return {
        success: false,
        error: 'User not authenticated',
      };

    const { avatar, ...profileData } = formData;
    let avatarUrl = user.user_metadata?.picture;

    if (avatar) {
      const avatarName = `${user.id}-${Date.now()}-${avatar.name}`.replaceAll(
        '/',
        '',
      );
      const newAvatarPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user_profile/${avatarName}`;

      if (user.user_metadata?.picture) {
        const oldAvatarName = user.user_metadata.picture.split('/').at(-1);
        if (oldAvatarName)
          await removeItemFromStorage(oldAvatarName, 'user_profile');
      }

      // Compress and upload new avatar
      const compressedAvatar = await handleImageCompression(
        avatar,
        256,
        256,
        true,
      );
      if (!compressedAvatar)
        return {
          success: false,
          error: 'Failed to process avatar image',
        };

      const { error: uploadError } = await uploadItemToStorage(
        compressedAvatar,
        avatarName,
        'user_profile',
      );

      if (uploadError)
        return {
          success: false,
          error: uploadError,
        };

      avatarUrl = newAvatarPath;
    }

    // Update user metadata
    const { error: updateError } = await supabase.auth.updateUser({
      phone: profileData.phone || null,
      data: {
        full_name: `${profileData.first_name} ${profileData.last_name}`,
        picture: avatarUrl,
      },
    });

    if (updateError)
      return {
        success: false,
        error: updateError.message,
      };

    revalidatePath('/dashboard/profile');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function updateUserPasword(
  password: string,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const user = await getUser();

    if (!user)
      return {
        success: false,
        error: 'User not authenticated',
      };

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError)
      return {
        success: false,
        error: updateError.message,
      };

    revalidatePath('/dashboard/profile');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
