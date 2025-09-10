import { createCategoryItem } from '@/supabase/data/categories-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { error, mutateAsync } = useMutation({
    mutationFn: createCategoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu_categories'] });
    },
  });

  return { mutateAsync, error };
}
