import { Table, TableFooter } from '@/components/ui/table';
import { Suspense } from 'react';

import MenuTableLoadingSkeleton from '../skeletons/MenuTableLoadingSkeleton';
import MenuTableBody from './MenuTableBody';
import MenuTableFooterContent from './MenuTableFooterContent';
import MenuTableHeader from './MenuTableHeader';
import MenuTableFooterSkeleton from '../skeletons/MenuTableFooterSkeleton';

function MenuTable() {
  return (
    <div className='rounded-md border'>
      <Table>
        <MenuTableHeader />

        <Suspense fallback={<MenuTableLoadingSkeleton />}>
          <MenuTableBody />
        </Suspense>

        <TableFooter>
          <Suspense fallback={<MenuTableFooterSkeleton />}>
            <MenuTableFooterContent />
          </Suspense>
        </TableFooter>
      </Table>
    </div>
  );
}

export default MenuTable;
