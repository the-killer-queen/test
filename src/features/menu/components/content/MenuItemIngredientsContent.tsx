import ErrorState from '@/components/shared/ErrorState';
import { P } from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import { getMenuItemIngredients } from '@/supabase/data/menu-service';
import { getTranslations } from 'next-intl/server';

async function MenuItemIngredientsContent({ menuId }: { menuId: string }) {
  const t = await getTranslations('menu');
  const { data: ingredients, error } = await getMenuItemIngredients(+menuId);

  if (error || !ingredients)
    return <ErrorState message={t('messages.error.failedToLoadIngredients')} />;

  if (ingredients.length === 0)
    return <P>{t('cards.ingredients.noIngredients')}</P>;

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
