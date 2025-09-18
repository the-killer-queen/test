import FilterBy from '@/components/shared/FilterBy';
import Search from '@/components/shared/Search';
import SortBy from '@/components/shared/SortBy';
import TableColumnFilter from '@/components/shared/TableColumnFilter';
import { getMenuSelectedCategories } from '@/supabase/data/categories-service';
import { menuFilterOptions } from '../../lib/utils';
import CreateMenuItemDialog from '../dialog/CreateMenuItemDialog';
import ManageCategoriesDialog from '../dialog/ManageCategoriesDialog';
import {
  menuExcludedColumnsOptions,
  menuSortByOptions,
} from '../../lib/constant';

async function MenuActions() {
  const { data: selectedCategories, error: selectedCatError } =
    await getMenuSelectedCategories();

  if (selectedCatError || !selectedCategories)
    return <p>{selectedCatError}!!!</p>;

  return (
    <div className='my-2 flex flex-col-reverse gap-2 xl:flex-row'>
      <div className='flex items-center gap-1 md:gap-2'>
        <FilterBy options={menuFilterOptions(selectedCategories)} />
        <SortBy options={menuSortByOptions} />

        <TableColumnFilter options={menuExcludedColumnsOptions} />
      </div>

      <div className='flex w-full items-center gap-1 md:gap-2'>
        <Search
          placeholder='Search menu items...'
          className='col-span-2 text-xs md:text-sm'
        />
        <ManageCategoriesDialog />
        <CreateMenuItemDialog />
      </div>
    </div>
  );
}

export default MenuActions;
