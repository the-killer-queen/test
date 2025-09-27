'use client';

import FilterBy from '@/components/shared/FilterBy';
import { useGetSelectedMenuCategories } from '@/hooks/useGetSelectedMenuCategories';
import { menuFilterOptions } from '@/lib/utils';
import { ListFilter as Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

type MenuItemsFilterProps = {
  filterName?: string;
};

function MenuItemsFilterSkeleton() {
  const t = useTranslations('components');

  return (
    <div className='animate-pulse'>
      <Button
        role='combobox'
        variant={'secondary'}
        disabled
        className='cursor-default opacity-70'
      >
        <Filter className='h-3 w-3 md:h-4 md:w-4' />
        <span className='hidden sm:inline'>{t('filterBy.applyFilter')}</span>
      </Button>
    </div>
  );
}

function MenuItemsFilter({ filterName }: MenuItemsFilterProps) {
  const {
    categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = useGetSelectedMenuCategories();

  if (categoriesError) return <p>Error!!!</p>;
  if (categoriesPending || !categories) return <MenuItemsFilterSkeleton />;

  return (
    <FilterBy options={menuFilterOptions(categories)} filterName={filterName} />
  );
}

export default MenuItemsFilter;
