import { Table } from '@/components/ui/table';
import { Suspense } from 'react';

import OrdersTableLoadingSkeleton from '../skeletons/OrdersTableLoadingSkeleton';
import OrdersTableHeader from './OrdersTableHeader';
import OrdersTableBody from './OrdersTableBody';

function OrdersTable() {
  return (
    <div className='rounded-md border'>
      <Table>
        <OrdersTableHeader />
        <Suspense fallback={<OrdersTableLoadingSkeleton />}>
          <OrdersTableBody />
        </Suspense>
      </Table>
    </div>
  );
}

export default OrdersTable;
