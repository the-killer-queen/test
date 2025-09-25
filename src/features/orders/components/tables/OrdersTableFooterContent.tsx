import { TableCell, TableRow } from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getOrdersCountByDate } from '@/supabase/data/orders-service';
import { searchParamsCache } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

async function OrdersTableFooterContent() {
  const t = await getTranslations('orders');
  const { selected_date } = searchParamsCache.all();
  const itemsLength = await getOrdersCountByDate(selected_date);

  return (
    <TableRow className='hover:!bg-transparent'>
      <TableCell colSpan={9}>
        <Pagination itemsLength={itemsLength}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious>
                {t('table.pagination.previous')}
              </PaginationPrevious>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext>{t('table.pagination.next')}</PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TableCell>
    </TableRow>
  );
}

export default OrdersTableFooterContent;
