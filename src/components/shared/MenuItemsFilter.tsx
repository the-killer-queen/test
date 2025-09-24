'use client';

import FilterBy from '@/components/shared/FilterBy';
import { useGetMenuCategories } from '@/hooks/useGetMenuCategories';
import { useGetSelectedMenuCategories } from '@/hooks/useGetSelectedMenuCategories';

function menuFilterOptions(
  categories: { name: string; icon_name: string | null }[],
) {
  return categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
    iconName: cat?.icon_name || '',
  }));
}

type MenuItemsFilterProps = {
  filterName?: string;
  fetchOnlySelected?: boolean;
};

function MenuItemsFilter({
  filterName,
  fetchOnlySelected = false,
}: MenuItemsFilterProps) {
  if (fetchOnlySelected) return <FilterBySelected filterName={filterName} />;
  if (!fetchOnlySelected) return <FilterByAll filterName={filterName} />;
}

function FilterBySelected({ filterName }: { filterName?: string | undefined }) {
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

function FilterByAll({ filterName }: { filterName?: string }) {
  const {
    categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = useGetMenuCategories();

  if (categoriesError) return <p>Error!!!</p>;
  if (categoriesPending || !categories) return <p>Loading...!!!</p>;

  return (
    <FilterBy options={menuFilterOptions(categories)} filterName={filterName} />
  );
}

export default MenuItemsFilter;
