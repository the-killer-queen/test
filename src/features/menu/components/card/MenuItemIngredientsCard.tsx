import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChefHat } from 'lucide-react';
import { Suspense } from 'react';
import MenuItemIngredientsContentSkeleton from '../skeletons/MenuItemIngredientsContentSkeleton';
import MenuItemIngredientsContent from '../content/MenuItemIngredientsContent';
import { getTranslations } from 'next-intl/server';

async function MenuItemIngredientsCard() {
  const t = await getTranslations('menu');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <ChefHat className='h-4 w-4' />
          {t('cards.ingredients.title')}
        </CardTitle>
        <CardDescription>{t('cards.ingredients.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          <Suspense fallback={<MenuItemIngredientsContentSkeleton />}>
            <MenuItemIngredientsContent />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}

export default MenuItemIngredientsCard;
