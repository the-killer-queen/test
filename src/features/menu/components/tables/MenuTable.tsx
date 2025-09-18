import { Table } from '@/components/ui/table';
import { Suspense } from 'react';

import TableContentHeader from '@/components/shared/TableContentHeader';
import MenuTableLoadingSkeleton from '../skeletons/MenuTableLoadingSkeleton';
import MenuTableBody from './MenuTableBody';
import { tableHeaderColumns } from '../../lib/constant';

function MenuTable() {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableContentHeader columns={tableHeaderColumns} />
        <Suspense fallback={<MenuTableLoadingSkeleton />}>
          <MenuTableBody />
        </Suspense>
      </Table>
    </div>
  );
}

export default MenuTable;
