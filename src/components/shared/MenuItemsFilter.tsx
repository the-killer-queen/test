'use client';

import FilterBy from '@/components/shared/FilterBy';
import { useGetSelectedMenuCategories } from '@/hooks/useGetSelectedMenuCategories';
import { menuFilterOptions } from '@/lib/utils';

type MenuItemsFilterProps = {
  filterName?: string;
};

function MenuItemsFilter({ filterName }: MenuItemsFilterProps) {
  const {
    categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = useGetSelectedMenuCategories();

  if (categoriesError) return <p>Error!!!</p>;
  if (categoriesPending || !categories) return <p>Loading...!!!</p>;

  return (
    <FilterBy options={menuFilterOptions(categories)} filterName={filterName} />
  );
}

export default MenuItemsFilter;
