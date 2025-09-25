import { Table, TableFooter } from '@/components/ui/table';
import { Suspense } from 'react';

import OrdersTableLoadingSkeleton from '../skeletons/OrdersTableLoadingSkeleton';
import OrdersTableBody from './OrdersTableBody';
import OrdersTableFooterContent from './OrdersTableFooterContent';
import OrdersTableHeader from './OrdersTableHeader';

function OrdersTable() {
  return (
    <div className='rounded-md border'>
      <Table>
        <OrdersTableHeader />
        <Suspense fallback={<OrdersTableLoadingSkeleton />}>
          <OrdersTableBody />
        </Suspense>

        <TableFooter>
          <Suspense fallback={null}>
            <OrdersTableFooterContent />
          </Suspense>
        </TableFooter>
      </Table>
    </div>
  );
}

export default OrdersTable;
