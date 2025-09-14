import { getMenu } from '@/supabase/data/menu-service';
import { useQuery } from '@tanstack/react-query';

export function useGetMenu() {
  const { data, isPending } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });

  return { menu: data?.data, error: data?.error, isPending };
}
