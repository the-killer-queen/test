import { Table } from '@/components/ui/table';
import { Suspense } from 'react';
import Body from './Body';
import Header from './Header';
import LoadingSkeleton from './LoadingSkeleton';
import { PageProps } from '@/types';

function MainTable({ searchParams }: PageProps) {
  return (
    <Table className='mt-4'>
      <Header />
      <Suspense fallback={<LoadingSkeleton />}>
        <Body searchParams={searchParams} />
      </Suspense>
    </Table>
  );
}

export default MainTable;
