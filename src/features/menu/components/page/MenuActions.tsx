import FilterBy from '@/components/shared/FilterBy';
import Search from '@/components/shared/Search';
import SortBy from '@/components/shared/SortBy';
import {
  getMenuCategories,
  getMenuSelectedCategories,
} from '@/supabase/data/menu-service';
import { menuFilterOptions } from '../../lib/utils';
import CreateMenuItemDialog from '../Dialog/CreateMenuItemDialog';

async function MenuActions() {
  const { data: selectedCategories, error: selectedCatError } =
    await getMenuSelectedCategories();
  const { data: categories, error } = await getMenuCategories();

  if (selectedCatError || !selectedCategories) return <p>{error}!!!</p>;
  if (error || !categories) return <p>{error}!!!</p>;

  return (
    <div className='my-2 flex flex-col-reverse gap-2 lg:flex-row'>
      <div className='flex items-center gap-2'>
        <FilterBy options={menuFilterOptions(selectedCategories)} />
        <SortBy
          options={[
            {
              value: 'created_at-desc',
              label: 'Sort by date (newest first)',
            },
            {
              value: 'created_at-asc',
              label: 'Sort by date (oldest first)',
            },
            { value: 'name-asc', label: 'Sort by name (A - Z)' },
            { value: 'name-desc', label: 'Sort by name (Z - A)' },
            {
              value: 'price-desc',
              label: 'Sort by price (high - low)',
            },
            { value: 'price-asc', label: 'Sort by price (low - high)' },
          ]}
        />
      </div>

      <div className='flex w-full items-center gap-2'>
        <Search placeholder='Search menu items...' className='col-span-2' />
        <CreateMenuItemDialog categories={categories} />
      </div>
    </div>
  );
}

export default MenuActions;
