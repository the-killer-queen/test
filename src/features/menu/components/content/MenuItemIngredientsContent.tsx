import ErrorState from '@/components/shared/ErrorState';
import { P } from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { getMenuItemIngredients } from '@/supabase/data/menu-service';

async function MenuItemIngredientsContent({ menuId }: { menuId: string }) {
  const { data: ingredients, error } = await getMenuItemIngredients(+menuId);

  if (error || !ingredients)
    return <ErrorState message='Failed to load ingredients' />;

  if (ingredients.length === 0) return <P>No Ingredients</P>;

  return ingredients.map((ingredient, i) => (
    <Badge key={i} variant='secondary' className='flex items-center gap-1'>
      <span>{ingredient.name}</span>
      {ingredient.quantity && (
        <span className='text-xs'>({ingredient.quantity})</span>
      )}
    </Badge>
  ));
}

export default MenuItemIngredientsContent;
