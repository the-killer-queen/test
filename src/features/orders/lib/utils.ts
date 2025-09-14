import { OrderRow } from '@/types/tables';

export function searchOrders(query: string | null, orders: OrderRow[]) {
  return query
    ? orders.filter(
        (order) =>
          order.customer_name?.toLowerCase().includes(query.toLowerCase()) ||
          order.order_name?.toLowerCase().includes(query.toLowerCase()) ||
          order.id.toString().includes(query),
      )
    : orders;
}

export function sortOrders(sortBy: string, orders: OrderRow[]) {
  const [field, direction] = sortBy.split('-') as [
    OrderSortField,
    SortDirection,
  ];
  const modifier = direction === 'asc' ? 1 : -1;

  return [...orders].sort((a, b) => {
    switch (field) {
      case 'created_at':
        return (
          (new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()) *
          modifier
        );
      case 'customer_name':
        return (
          (a.customer_name || '').localeCompare(b.customer_name || '') *
          modifier
        );
      case 'total_price':
        return (a.total_price - b.total_price) * modifier;
      default:
        return 0;
    }
  });
}

export function filterOrders(filters: string[], orders: OrderRow[]) {
  return filters.length > 0
    ? orders.filter((order) => {
        return filters.some((filter) => {
          switch (filter.toLowerCase()) {
            case 'paid':
              return order.status === 'paid';
            case 'unpaid':
              return order.status === 'unpaid';
            case 'togo':
              return order.is_togo === true;
            case 'dinein':
              return order.is_togo === false;
            default:
              return false;
          }
        });
      })
    : orders;
}

// Type definitions (add these to your types file)
type OrderSortField = 'created_at' | 'customer_name' | 'total_price';
type SortDirection = 'asc' | 'desc';
