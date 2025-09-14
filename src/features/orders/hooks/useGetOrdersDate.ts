import { getOrdersDate } from '@/supabase/data/orders-service';
import { useQuery } from '@tanstack/react-query';

export function useGetOrdersDate() {
  const { data, isPending } = useQuery({
    queryFn: getOrdersDate,
    queryKey: ['orders_date'],
  });

  return { ordersDate: data?.data, error: data?.error, isPending };
}
