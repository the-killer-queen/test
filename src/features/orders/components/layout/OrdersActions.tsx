'use client';

import FilterBy from '@/components/shared/FilterBy';
import Search from '@/components/shared/Search';
import SortBy from '@/components/shared/SortBy';
import TableColumnFilter from '@/components/shared/TableColumnFilter';
import { useTranslations } from 'next-intl';
import {
  useOrderExcludedColumnsOptions,
  useOrderFilterOptions,
  useOrderSortByOptions,
} from '../../lib/constant';
import CreateOrderDialog from '../dialog/CreateOrderDialog';
import DateRangePicker from '../selects/DateRangePicker';

function OrdersActions() {
  const t = useTranslations('orders');

  const filter = useOrderFilterOptions();
  const sortBy = useOrderSortByOptions();
  const excludedColumns = useOrderExcludedColumnsOptions();

  return (
    <div className='my-1 flex flex-col-reverse gap-2 md:my-2 xl:flex-row'>
      <div className='flex items-center gap-1 md:gap-2'>
        <FilterBy options={filter} />
        <SortBy options={sortBy} />
        <TableColumnFilter options={excludedColumns} />
      </div>

      <div className='flex w-full items-center gap-2'>
        <Search placeholder={t('actions.search')} className='col-span-2' />
        <DateRangePicker />
        <CreateOrderDialog />
      </div>
    </div>
  );
}

export default OrdersActions;
