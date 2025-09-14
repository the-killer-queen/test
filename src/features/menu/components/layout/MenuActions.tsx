import FilterBy from '@/components/shared/FilterBy';
import Search from '@/components/shared/Search';
import SortBy from '@/components/shared/SortBy';
import TableColumnFilter from '@/components/shared/TableColumnFilter';
import { getMenuSelectedCategories } from '@/supabase/data/categories-service';
import { menuFilterOptions } from '../../lib/utils';
import CreateMenuItemDialog from '../dialog/CreateMenuItemDialog';
import ManageCategoriesDialog from '../dialog/ManageCategoriesDialog';

async function MenuActions() {
  const { data: selectedCategories, error: selectedCatError } =
    await getMenuSelectedCategories();

  if (selectedCatError || !selectedCategories)
    return <p>{selectedCatError}!!!</p>;

  return (
    <div className='my-2 flex flex-col-reverse gap-2 xl:flex-row'>
      <div className='flex items-center gap-2'>
        <FilterBy options={menuFilterOptions(selectedCategories)} />
        <SortBy
          options={[
            { value: 'created_at-desc', label: 'Newest first' },
            { value: 'created_at-asc', label: 'Oldest first' },
            { value: 'name-asc', label: 'Name (A - Z)' },
            { value: 'name-desc', label: 'Name (Z - A)' },
            { value: 'price-desc', label: 'Price (high - low)' },
            { value: 'price-asc', label: 'Price (low - high)' },
          ]}
        />

        <TableColumnFilter
          options={[
            { value: 'menu_item_picture', label: 'Picture' },
            { value: 'category', label: 'Category' },
            { value: 'ingredients', label: 'Ingredients' },
          ]}
        />
      </div>

      <div className='flex w-full items-center gap-2'>
        <Search placeholder='Search menu items...' className='col-span-2' />
        <ManageCategoriesDialog />
        <CreateMenuItemDialog />
      </div>
    </div>
  );
}

export default MenuActions;
