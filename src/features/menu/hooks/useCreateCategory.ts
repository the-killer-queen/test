import { createCategoryItem as createCategoryItemApi } from '@/supabase/data/categories-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { error, mutateAsync: createCategoryItem } = useMutation({
    mutationFn: createCategoryItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu_categories'] });
    },
  });

  return { createCategoryItem, error };
}
