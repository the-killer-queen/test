import { Table, TableFooter } from '@/components/ui/table';
import { Suspense } from 'react';

import TableContentHeader from '@/components/shared/TableContentHeader';
import { tableHeaderColumns } from '../../lib/constant';
import MenuTableLoadingSkeleton from '../skeletons/MenuTableLoadingSkeleton';
import MenuTableBody from './MenuTableBody';
import MenuTableFooterContent from './MenuTableFooterContent';

function MenuTable() {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableContentHeader columns={tableHeaderColumns} />
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
