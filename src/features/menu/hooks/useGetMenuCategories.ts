import { getMenuCategories } from '@/supabase/data/categories-service';
import { useQuery } from '@tanstack/react-query';

export function useGetMenuCategories() {
  const { data, isPending } = useQuery({
    queryKey: ['menu_categories'],
    queryFn: getMenuCategories,
  });

  return { categories: data?.data, error: data?.error, isPending };
}
