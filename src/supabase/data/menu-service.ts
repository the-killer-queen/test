'use server';

import { GetActionResult } from '@/types';
import { MenuInsert, MenuRow, MenuUpdate } from '@/types/tables';
import { createClient } from '../server';
import { revalidatePath } from 'next/cache';
import { Tag } from '@/features/menu/schema/types';

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

export async function createMenuItem(
  newMenuItem: MenuInsert,
): Promise<GetActionResult<MenuInsert>> {
  try {
    const supabase = await createClient();
    const { data: menuItem, error: menuError } = await supabase
      .from('menu')
      .insert(newMenuItem)
      .select()
      .single();

    if (menuError || !menuItem)
      return {
        success: false,
        error: menuError.message,
      };

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

export async function getMenuCategories(): Promise<
  GetActionResult<{ tag: Tag | null }[]>
> {
  try {
    const supabase = await createClient();
    const { data: menuTags, error: menuTagsError } = await supabase
      .from('menu_tags')
      .select('tag');

    if (menuTagsError)
      return {
        success: false,
        error: menuTagsError.message,
      };

    return { success: true, data: menuTags };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
