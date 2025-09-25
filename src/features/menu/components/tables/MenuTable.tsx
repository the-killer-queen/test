import { Table, TableFooter } from '@/components/ui/table';
import { Suspense } from 'react';

import MenuTableLoadingSkeleton from '../skeletons/MenuTableLoadingSkeleton';
import MenuTableBody from './MenuTableBody';
import MenuTableFooterContent from './MenuTableFooterContent';
import MenuTableHeader from './MenuTableHeader';

function MenuTable() {
  return (
    <div className='rounded-md border'>
      <Table>
        <MenuTableHeader />

        <Suspense fallback={<MenuTableLoadingSkeleton />}>
          <MenuTableBody />
        </Suspense>

        <TableFooter>
          <Suspense fallback={null}>
            <MenuTableFooterContent />
          </Suspense>
        </TableFooter>
      </Table>
    </div>
  );
}

export default MenuTable;
