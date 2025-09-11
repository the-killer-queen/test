'use server';

import { createClient } from '@/supabase/server';
import { GetActionResult } from '@/types';
import {
  DeletedMenuCategoryRow,
  MenuCategoryInsert,
  MenuCategoryRow,
} from '@/types/tables';
import { revalidatePath } from 'next/cache';

export async function getMenuCategories(): Promise<
  GetActionResult<MenuCategoryRow[]>
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
      .neq('category', 'null');

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

export async function deleteCategoryItem(
  categoryItemId: number,
  name: string,
): Promise<GetActionResult<DeletedMenuCategoryRow>> {
  try {
    const supabase = await createClient();

    const { error: menuItemsError } = await supabase
      .from('menu')
      .update({ category: null })
      .eq('category', name);

    if (menuItemsError) {
      return {
        success: false,
        error: menuItemsError.message,
      };
    }

    const { data: deletedCategoryItem, error: deleteCategoryError } =
      await supabase
        .from('menu_categories')
        .delete()
        .eq('id', categoryItemId)
        .select('*')
        .single();

    if (deleteCategoryError)
      return {
        success: false,
        error: deleteCategoryError.message,
      };

    revalidatePath('/dashboard/menu');
    return { success: true, data: deletedCategoryItem };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
