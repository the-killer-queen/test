'use client';

import FilterBy from '@/components/shared/FilterBy';
import { useGetMenuCategories } from '@/features/menu/hooks/useGetMenuCategories';
import MenuItemsSelectorError from '../error/MenuItemsSelectorError';
import MenuItemsSelectorSkeleton from '../skeletons/MenuItemsSelectorSkeleton';

function MenuItemsFilter() {
  const {
    categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = useGetMenuCategories();
  if (categoriesError) return <MenuItemsSelectorError />;
  if (categoriesPending || !categories) return <MenuItemsSelectorSkeleton />;

  const filterOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
    iconName: category.icon_name || '',
  }));

  return <FilterBy options={filterOptions} filterName='menu_item_filter' />;
}

export default MenuItemsFilter;
