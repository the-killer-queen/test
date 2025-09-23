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

async function OrdersTableFooterContent() {
  const { selected_date } = searchParamsCache.all();
  const itemsLength = await getOrdersCountByDate(selected_date);

  return (
    <TableRow className='hover:!bg-transparent'>
      <TableCell colSpan={9}>
        <Pagination itemsLength={itemsLength}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TableCell>
    </TableRow>
  );
}

export default OrdersTableFooterContent;
