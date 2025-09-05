import { Table } from '@/components/ui/table';
import { PageProps } from '@/types';
import { Suspense } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

import MenuTableBody from './MenuTableBody';
import MenuTableHeader from './MenuTableHeader';

function MenuTable({ searchParams }: PageProps) {
  return (
    <div className='rounded-md border'>
      <Table>
        <MenuTableHeader />
        <Suspense fallback={<LoadingSkeleton />}>
          <MenuTableBody searchParams={searchParams} />
        </Suspense>
      </Table>
    </div>
  );
}

export default MenuTable;
