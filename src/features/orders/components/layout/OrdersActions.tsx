import FilterBy from '@/components/shared/FilterBy';
import Search from '@/components/shared/Search';
import SortBy from '@/components/shared/SortBy';
import TableColumnFilter from '@/components/shared/TableColumnFilter';
import CreateOrderDialog from '../dialog/CreateOrderDialog';
import DateRangePicker from '../selects/DateRangePicker';
import {
  orderExcludedColumnsOptions,
  orderFilterOptions,
  orderSortByOptions,
} from '../../lib/constant';
import { getTranslations } from 'next-intl/server';

async function OrdersActions() {
  const t = await getTranslations('orders');

  return (
    <div className='my-1 flex flex-col-reverse gap-2 md:my-2 xl:flex-row'>
      <div className='flex items-center gap-1 md:gap-2'>
        <FilterBy options={orderFilterOptions} />
        <SortBy options={orderSortByOptions} />
        <TableColumnFilter options={orderExcludedColumnsOptions} />
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
