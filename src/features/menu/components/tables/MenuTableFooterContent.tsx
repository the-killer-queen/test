import { TableCell, TableRow } from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getMenuItemCount } from '@/supabase/data/menu-service';
import { getTranslations } from 'next-intl/server';

async function MenuTableFooterContent() {
  const t = await getTranslations('menu');
  const itemsLength = await getMenuItemCount();

  return (
    <TableRow className='hover:!bg-transparent'>
      <TableCell colSpan={6}>
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

export default MenuTableFooterContent;
