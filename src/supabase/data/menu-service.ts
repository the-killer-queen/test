'use server';

import { handleImageCompression } from '@/lib/actions';
import { GetActionResult } from '@/types';
import {
  DeletedMenuRow,
  MenuInsert,
  MenuItemDetailsRow,
  MenuItemImageRow,
  MenuItemIngredientsRow,
  MenuRow,
  MenuUpdate,
} from '@/types/tables';
import { revalidatePath } from 'next/cache';
import { createBuildTimeClient } from '../client';
import { createClient } from '../server';
import { removeItemFromStorage, uploadItemToStorage } from './global-service';

//GET METHODS
export async function getMenu(): Promise<GetActionResult<MenuRow[]>> {
  try {
    const supabase = await createClient();
    const { data: menu, error: menuError } = await supabase
      .from('menu')
      .select('*, menu_categories(*)');

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

export async function getMenuItemById(
  menuItemId: number,
): Promise<GetActionResult<MenuRow>> {
  try {
    const supabase = await createClient();
    const { data: menuItem, error: menuItemError } = await supabase
      .from('menu')
      .select('*, menu_categories(*)')
      .eq('id', menuItemId)
      .single();
    if (menuItemError)
      return {
        success: false,
        error: menuItemError.message,
      };

    return { success: true, data: menuItem };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getMenuItemDetails(
  menuItemId: number,
): Promise<GetActionResult<MenuItemDetailsRow>> {
  try {
    const supabase = await createClient();
    const { data: menu, error: menuError } = await supabase
      .from('menu')
      .select(
        'name, price, category, created_at, menu_categories(name, icon_name)',
      )
      .eq('id', menuItemId)
      .single();

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

export async function getMenuItemImage(
  menuItemId: number,
): Promise<GetActionResult<MenuItemImageRow>> {
  try {
    const supabase = await createClient();
    const { data: menu, error: menuError } = await supabase
      .from('menu')
      .select('name, image_url')
      .eq('id', menuItemId)
      .single();

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

export async function getMenuItemIngredients(
  menuItemId: number,
): Promise<GetActionResult<MenuItemIngredientsRow>> {
  try {
    const supabase = await createClient();
    const { data: menu, error: menuError } = await supabase
      .from('menu')
      .select('ingredients')
      .eq('id', menuItemId)
      .single();

    if (menuError)
      return {
        success: false,
        error: menuError.message,
      };

    return { success: true, data: menu.ingredients };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getMenuItemDescription(
  menuItemId: number,
): Promise<GetActionResult<string | null>> {
  try {
    const supabase = await createClient();
    const { data: menu, error: menuError } = await supabase
      .from('menu')
      .select('description')
      .eq('id', menuItemId)
      .single();

    if (menuError)
      return {
        success: false,
        error: menuError.message,
      };

    return { success: true, data: menu.description };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

//CREATE METHODS
export async function createMenuItem(
  newMenuItem: MenuInsert,
): Promise<GetActionResult<MenuInsert>> {
  try {
    const { image, ...otherOptions } = newMenuItem;
    const imageName = image
      ? `${Math.random()}-${image?.name}`.replaceAll('/', '')
      : null;
    const imagePath = `${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/storage/v1/object/public/menu_items_pictures/${imageName}`;

    const supabase = await createClient();

    const { data: menuItem, error: menuError } = await supabase
      .from('menu')
      .insert({ ...otherOptions, image_url: imagePath })
      .select()
      .single();

    if (menuError || !menuItem)
      return {
        success: false,
        error: menuError.message,
      };

    if (image) {
      const compressedImage = await handleImageCompression(image);

      if (!compressedImage)
        return {
          success: false,
          error: 'Failed to compress image',
        };

      const { error } = await uploadItemToStorage(
        compressedImage,
        imageName!,
        'menu_items_pictures',
      );

      if (error) {
        await deleteMenuItem(menuItem.id);
        return { success: false, error: error };
      }
    }

    revalidatePath('/dashboard/menu');
    return { success: true, data: menuItem };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function createMenuItemDuplicate(
  originalItemId: number,
): Promise<GetActionResult<MenuInsert>> {
  try {
    const supabase = await createClient();

    const { data: originalItem, error: fetchError } = await supabase
      .from('menu')
      .select('*')
      .eq('id', originalItemId)
      .single();

    if (fetchError || !originalItem)
      return {
        success: false,
        error: fetchError?.message || 'Original menu item not found',
      };

    const { id, created_at, updated_at, image_url, ...duplicateData } =
      originalItem;

    const newMenuItem = {
      ...duplicateData,
      name: `${originalItem.name} (Copy)`,
    };

    let newImagePath = null;
    let newImageName = null;

    if (originalItem.image_url) {
      const originalImageName = originalItem.image_url.split('/').pop();
      newImageName = `${Math.random()}-copy-${originalImageName}`.replaceAll(
        '/',
        '',
      );
      newImagePath = `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/menu_items_pictures/${newImageName}`;

      const { error: copyError } = await supabase.storage
        .from('menu_items_pictures')
        .copy(originalImageName!, newImageName);

      if (copyError) {
        console.warn('Failed to copy image:', copyError.message);
        newImagePath = null;
      }
    }

    const { data: duplicatedMenuItem, error: insertError } = await supabase
      .from('menu')
      .insert({ ...newMenuItem, image_url: newImagePath })
      .select()
      .single();

    if (insertError || !duplicatedMenuItem) {
      if (newImageName) {
        await supabase.storage
          .from('menu_items_pictures')
          .remove([newImageName]);
      }

      return {
        success: false,
        error: insertError?.message || 'Failed to create duplicate menu item',
      };
    }

    revalidatePath('/dashboard/menu');
    return { success: true, data: duplicatedMenuItem };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getAllMenuItemIds(): Promise<number[]> {
  try {
    const supabase = createBuildTimeClient();

    const { data: menuItems, error } = await supabase.from('menu').select('id');

    if (error) {
      console.error('Error fetching menu item IDs:', error.message);
      return [];
    }

    return menuItems?.map((item) => item.id) || [];
  } catch (error) {
    console.error(
      'Unexpected error fetching menu item IDs:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return [];
  }
}

// UPDATE METHODS
export async function updateMenuItem(
  menuToUpdate: MenuUpdate,
  menuItemId: number,
): Promise<GetActionResult<MenuUpdate>> {
  try {
    const { image, image_url: oldImageUrl, ...otherOptions } = menuToUpdate;
    const imageName = image
      ? `${Math.random()}-${image?.name}`.replaceAll('/', '')
      : null;
    const imagePath = `${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/storage/v1/object/public/menu_items_pictures/${imageName}`;

    const supabase = await createClient();
    const { data: updatedMenu, error: updateMenuItemError } = await supabase
      .from('menu')
      .update({
        ...otherOptions,
        image_url: !imageName ? oldImageUrl : imagePath,
      })
      .eq('id', menuItemId)
      .select()
      .single();

    if (updateMenuItemError || !updatedMenu)
      return {
        success: false,
        error: updateMenuItemError.message,
      };

    if (image) {
      if (oldImageUrl) {
        const imagePathToRemove = oldImageUrl.split('/').at(-1);
        const { error: removeError } = await removeItemFromStorage(
          imagePathToRemove!,
          'menu_items_pictures',
        );

        if (removeError)
          return {
            success: false,
            error: removeError,
          };
      }

      const compressedImage = await handleImageCompression(image);

      if (!compressedImage)
        return {
          success: false,
          error: 'Failed to compress image',
        };

      const { error: uploadError } = await uploadItemToStorage(
        compressedImage,
        imageName!,
        'menu_items_pictures',
      );

      if (uploadError)
        return {
          success: false,
          error: uploadError,
        };
    }

    revalidatePath('/dashboard/menu');
    return { success: true, data: updatedMenu };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

// DELETE METHODS
export async function deleteMenuItem(
  menuItemId: number,
): Promise<GetActionResult<DeletedMenuRow>> {
  try {
    const supabase = await createClient();
    const { data: deletedItem, error: deleteMenuItemError } = await supabase
      .from('menu')
      .delete()
      .eq('id', menuItemId)
      .select('*')
      .single();

    if (deleteMenuItemError)
      return {
        success: false,
        error: deleteMenuItemError.message,
      };

    revalidatePath('/dashboard/menu');
    return { success: true, data: deletedItem };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

//VALIDATOR
export async function checkMenuItemExists(
  id: number,
): Promise<{ exists: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('menu')
      .select('id')
      .eq('id', id)
      .single();

    if (error && error.code === 'PGRST116') return { exists: false };

    if (error) return { exists: false, error: error.message };

    return { exists: true };
  } catch (error) {
    return {
      exists: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
