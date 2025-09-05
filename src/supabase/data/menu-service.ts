'use server';

import { createClient } from '@/supabase/server';
import { GetActionResult } from '@/types';
import {
  MenuCategoryInsert,
  MenuInsert,
  MenuRow,
  MenuUpdate,
} from '@/types/tables';
import { revalidatePath } from 'next/cache';

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

export async function getMenuCategories(): Promise<
  GetActionResult<{ name: string; icon_name: string | null }[]>
> {
  try {
    const supabase = await createClient();
    const { data: categories, error: categoriesError } = await supabase
      .from('menu_categories')
      .select('*');

    if (categoriesError)
      return {
        success: false,
        error: categoriesError.message,
      };

    return { success: true, data: categories };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function getMenuSelectedCategories(): Promise<
  GetActionResult<{ name: string; icon_name: string | null }[]>
> {
  try {
    const supabase = await createClient();
    const { data: menu, error: selectedCategoryError } = await supabase
      .from('menu')
      .select('category')
      .neq('category', null);

    if (selectedCategoryError)
      return {
        success: false,
        error: selectedCategoryError.message,
      };

    const { data: menu_categories, error: categoriesError } = await supabase
      .from('menu_categories')
      .select('name, icon_name');

    if (categoriesError)
      return {
        success: false,
        error: categoriesError.message,
      };

    const selectedCategories = menu
      .map((r) => r.category)
      .filter((cat) => cat !== null);

    const categories = menu_categories.filter((cat) =>
      selectedCategories.find((selectedCat) => selectedCat === cat.name),
    );

    return { success: true, data: categories };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

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
      const { error } = await supabase.storage
        .from('menu_items_pictures')
        .upload(imageName!, image);

      if (error) {
        await deleteMenuItem(menuItem.id);
        return {
          success: false,
          error: error.message,
        };
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

export async function createCategoryItem(
  newCategoryItem: MenuCategoryInsert,
): Promise<GetActionResult<MenuCategoryInsert>> {
  try {
    const supabase = await createClient();
    const { data: categoryItem, error: categoryError } = await supabase
      .from('menu_categories')
      .insert(newCategoryItem)
      .select()
      .single();

    if (categoryError || !categoryItem)
      return {
        success: false,
        error: categoryError.message,
      };

    revalidatePath('/dashboard/menu');
    return { success: true, data: categoryItem };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function updateMenuItem(
  menuToUpdate: MenuUpdate,
  menuItemId: number,
): Promise<GetActionResult<MenuUpdate>> {
  try {
    const supabase = await createClient();
    const { data: updatedMenu, error: updateMenuItemError } = await supabase
      .from('menu')
      .update(menuToUpdate)
      .eq('id', menuItemId)
      .select()
      .single();

    if (updateMenuItemError || !updatedMenu)
      return {
        success: false,
        error: updateMenuItemError.message,
      };

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

export async function deleteMenuItem(
  menuItemId: number,
): Promise<GetActionResult> {
  try {
    const supabase = await createClient();
    const { error: deleteMenuItemError } = await supabase
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
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
