'use server';

import { GetActionResult } from '@/types';
import { createClient } from '../server';
import { removeItemFromStorage, uploadItemToStorage } from './global-service';
import { handleImageCompression } from '@/lib/actions';
import { revalidatePath } from 'next/cache';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { avatar, ...profileData } = formData;
    let avatarUrl = user.user_metadata?.avatar_url;

    // Handle avatar upload if provided
    if (avatar) {
      const avatarName = `${user.id}-${Date.now()}-${avatar.name}`.replaceAll(
        '/',
        '',
      );
      const newAvatarPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarName}`;

      // Remove old avatar if exists
      if (user.user_metadata?.avatar_url) {
        const oldAvatarName = user.user_metadata.avatar_url.split('/').pop();
        if (oldAvatarName) {
          await removeItemFromStorage(oldAvatarName, 'avatars');
        }
      }

      // Compress and upload new avatar
      const compressedAvatar = await handleImageCompression(avatar);
      if (!compressedAvatar)
        return {
          success: false,
          error: 'Failed to process avatar image',
        };

      const { error: uploadError } = await uploadItemToStorage(
        compressedAvatar,
        avatarName,
        'avatars',
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
      data: {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone || null,
        avatar_url: avatarUrl,
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
