import MenuItemsFilter from '@/components/shared/MenuItemsFilter';
import Search from '@/components/shared/Search';
import SortBy from '@/components/shared/SortBy';
import TableColumnFilter from '@/components/shared/TableColumnFilter';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import {
  menuExcludedColumnsOptions,
  menuSortByOptions,
} from '../../lib/constant';
import CreateMenuItemDialog from '../dialog/CreateMenuItemDialog';
import ManageCategoriesDialog from '../dialog/ManageCategoriesDialog';

async function MenuActions() {
  const t = await getTranslations('menu');

  return (
    <div className='my-2 flex flex-col-reverse gap-2 xl:flex-row'>
      <div className='flex items-center gap-1 md:gap-2'>
        <Suspense>
          <MenuItemsFilter />
        </Suspense>
        <SortBy options={menuSortByOptions} />

        <TableColumnFilter options={menuExcludedColumnsOptions} />
      </div>

      <div className='flex w-full items-center gap-1 md:gap-2'>
        <Search
          placeholder={t('ctaActions.search')}
          className='col-span-2 text-xs md:text-sm'
        />
        <ManageCategoriesDialog />
        <CreateMenuItemDialog />
      </div>
    </div>
  );
}

export default MenuActions;
