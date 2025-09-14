import { searchParamsCache } from '@/lib/searchParamsCache';
import { getOrdersByDate } from '@/supabase/data/orders-service';
import OrdersTableBodyClient from './OrdersTableBodyClient';
import OrdersTableEmptyState from './OrdersTableEmptyState';

async function OrdersTableBody() {
  const { selected_date } = searchParamsCache.all();
  const { data: orders, error } = await getOrdersByDate(selected_date);

  if (error || !orders) return <OrdersTableEmptyState type='error' />;

  return <OrdersTableBodyClient orders={orders} />;
}

export default OrdersTableBody;
