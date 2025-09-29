import { getMenuSelectedCategories } from '@/supabase/data/categories-service';
import { useQuery } from '@tanstack/react-query';

export function useGetSelectedMenuCategories() {
  const { data, isPending } = useQuery({
    queryKey: ['menu_categories'],
    queryFn: getMenuSelectedCategories,
    refetchOnMount: false,
  });

  return { categories: data?.data, error: data?.error, isPending };
}
