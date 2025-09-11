import { Table } from '@/components/ui/table';
import { Suspense } from 'react';

import MenuTableLoadingSkeleton from '../skeletons/MenuTableLoadingSkeleton';
import MenuTableBody from './MenuTableBody';
import MenuTableHeader from './MenuTableHeader';

function MenuTable() {
  return (
    <div className='rounded-md border'>
      <Table>
        <MenuTableHeader />
        <Suspense fallback={<MenuTableLoadingSkeleton />}>
          <MenuTableBody />
        </Suspense>
      </Table>
    </div>
  );
}

export default MenuTable;
