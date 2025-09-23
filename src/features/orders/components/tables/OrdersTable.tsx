import { Table, TableFooter } from '@/components/ui/table';
import { Suspense } from 'react';

import TableContentHeader from '@/components/shared/TableContentHeader';
import { tableHeaderColumns } from '../../lib/constant';
import OrdersTableLoadingSkeleton from '../skeletons/OrdersTableLoadingSkeleton';
import OrdersTableBody from './OrdersTableBody';
import OrdersTableFooterContent from './OrdersTableFooterContent';

function OrdersTable() {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableContentHeader columns={tableHeaderColumns} />
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
