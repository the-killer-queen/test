import { Table } from '@/components/ui/table';
import { PageProps } from '@/types';
import { Suspense } from 'react';

import MenuTableLoadingSkeleton from '../skeletons/MenuTableLoadingSkeleton';
import MenuTableBody from './MenuTableBody';
import MenuTableHeader from './MenuTableHeader';

function MenuTable({ searchParams }: PageProps) {
  return (
    <div className='rounded-md border'>
      <Table>
        <MenuTableHeader searchParams={searchParams} />
        <Suspense fallback={<MenuTableLoadingSkeleton />}>
          <MenuTableBody searchParams={searchParams} />
        </Suspense>
      </Table>
    </div>
  );
}

export default MenuTable;
