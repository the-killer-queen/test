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

function MenuItemIngredientsCard({ menuId }: { menuId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <ChefHat className='h-4 w-4' />
          Ingredients
        </CardTitle>
        <CardDescription>
          Complete list of ingredients and quantities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          <Suspense fallback={<MenuItemIngredientsContentSkeleton />}>
            <MenuItemIngredientsContent menuId={menuId} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}

export default MenuItemIngredientsCard;
