import { searchParamsCache } from '@/lib/utils';
import { getOrderById } from '@/supabase/data/orders-service';
import OrderQuickActionsCard from '../card/OrderQuickActionsCard';

async function OrderQuickActionsContent() {
  const { orderId } = searchParamsCache.all();
  if (!orderId) return null;

  const { data: order, error } = await getOrderById(orderId);

  //---> MUST CHANGE <---
  if (error || !order) return <p>ERROR...</p>;

  return <OrderQuickActionsCard order={order} />;
}

export default OrderQuickActionsContent;
