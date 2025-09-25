'use client';

import TableContentHeader from '@/components/shared/TableContentHeader';
import { useOrderTableHeaderColumns } from '../../lib/constant';

function OrdersTableHeader() {
  const content = useOrderTableHeaderColumns();

  return <TableContentHeader columns={content} />;
}

export default OrdersTableHeader;
