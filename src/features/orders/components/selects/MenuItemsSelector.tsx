import FiltersList from '@/components/shared/FiltersList';
import Search from '@/components/shared/Search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ControllerRenderProps } from 'react-hook-form';
import MenuItemsFilter from '../layout/MenuItemsFilter';
import OrderSummary from '../layout/OrderSummary';
import OrderItemList from '../layout/OrderItemList';
import { useTranslations } from 'next-intl';

function MenuItemsSelector(field: ControllerRenderProps) {
  const t = useTranslations('orders');

  return (
    <div className='space-y-4'>
      <Card className='flex flex-col gap-2 bg-transparent'>
        <CardHeader className='flex flex-col gap-2'>
          <div className='flex w-full gap-2'>
            <MenuItemsFilter />
            <Search
              className='flex-1'
              placeholder={t('menuSelector.searchPlaceholder')}
              name={'menu_item_query'}
            />
          </div>

          <FiltersList filterName='menu_item_filter' />
        </CardHeader>

        <CardContent>
          <OrderItemList field={field} />
          <OrderSummary field={field} />
        </CardContent>
      </Card>
    </div>
  );
}

export default MenuItemsSelector;
