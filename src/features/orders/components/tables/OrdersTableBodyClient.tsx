'use client';

import { TableBody } from '@/components/ui/table';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { useSortByQuery } from '@/hooks/useSortByQuery';
import { OrderRow } from '@/types/tables';
import { useQueryState } from 'nuqs';
import OrdersTableEmptyState from './OrdersTableEmptyState';
import OrdersTableRow from './OrdersTableRow';
import { filterOrders, searchOrders, sortOrders } from '../../lib/utils';

type OrdersTableBodyClientProps = {
  orders: OrderRow[];
};

function OrdersTableBodyClient({ orders }: OrdersTableBodyClientProps) {
  const { filters } = useFiltersQuery();
  const { sortBy } = useSortByQuery();
  const [query] = useQueryState('query');

  // Search Orders
  const searchedOrders = searchOrders(query, orders);

  // Sort Orders
  const sortedOrders = sortOrders(sortBy, searchedOrders);

  // Filter Orders
  const filteredOrders = filterOrders(filters, sortedOrders);

  if (orders.length === 0) return <OrdersTableEmptyState type='no-data' />;

  if (filteredOrders.length === 0)
    return (
      <OrdersTableEmptyState
        type='no-results'
        searchQuery={query}
        filterBy={filters}
      />
    );

  return (
    <TableBody>
      {filteredOrders.map((order) => (
        <OrdersTableRow key={order.id} order={order} />
      ))}
    </TableBody>
  );
}

export default OrdersTableBodyClient;
