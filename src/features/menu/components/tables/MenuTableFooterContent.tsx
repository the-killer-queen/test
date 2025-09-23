import { TableCell, TableRow } from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getMenuItemCount } from '@/supabase/data/menu-service';

async function MenuTableFooterContent() {
  const itemsLength = await getMenuItemCount();

  return (
    <TableRow className='hover:!bg-transparent'>
      <TableCell colSpan={6}>
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

export default MenuTableFooterContent;
