import { getOrders } from '@/supabase/data/orders-service';

async function OrdersPage() {
  const { data: orders, error } = await getOrders();

  if (error || !orders) return <p>{error}</p>;

  return <div>{orders.map((order) => order.order_name)}</div>;
}

export default OrdersPage;
