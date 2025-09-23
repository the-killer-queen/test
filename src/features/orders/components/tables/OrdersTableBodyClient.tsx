'use client';

import { TableBody } from '@/components/ui/table';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { useSortByQuery } from '@/hooks/useSortByQuery';
import { OrderRow } from '@/types/tables';
import { parseAsInteger, useQueryState } from 'nuqs';
import OrdersTableEmptyState from './OrdersTableEmptyState';
import OrdersTableRow from './OrdersTableRow';
import { filterOrders, searchOrders, sortOrders } from '../../lib/utils';
import { RESULT_PER_PAGE } from '@/config/config';

type OrdersTableBodyClientProps = {
  orders: OrderRow[];
};

function OrdersTableBodyClient({ orders }: OrdersTableBodyClientProps) {
  const { filters } = useFiltersQuery();
  const { sortBy } = useSortByQuery();
  const [query] = useQueryState('query');
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));

  // Search Orders
  const searchedOrders = searchOrders(query, orders);

  // Sort Orders
  const sortedOrders = sortOrders(sortBy, searchedOrders);

  // Filter Orders
  const filteredOrders = filterOrders(filters, sortedOrders);

  const ordersPerPage = filteredOrders.slice(
    (page - 1) * RESULT_PER_PAGE,
    page * RESULT_PER_PAGE,
  );

  if (ordersPerPage.length === 0)
    return <OrdersTableEmptyState type='no-data' />;

  if (ordersPerPage.length === 0)
    return (
      <OrdersTableEmptyState
        type='no-results'
        searchQuery={query}
        filterBy={filters}
      />
    );

  return (
    <TableBody>
      {ordersPerPage.map((order) => (
        <OrdersTableRow key={order.id} order={order} />
      ))}
    </TableBody>
  );
}

export default OrdersTableBodyClient;
