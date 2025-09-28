import { Card, CardContent } from '@/components/ui/card';
import { Suspense } from 'react';
import MenuItemImageContentSkeleton from '../skeletons/MenuItemImageContentSkeleton';
import MenuItemImageContent from '../content/MenuItemImageContent';

function MenuItemImageCard() {
  return (
    <Card className='h-full overflow-hidden p-0'>
      <CardContent className='h-full p-0'>
        <Suspense fallback={<MenuItemImageContentSkeleton />}>
          <MenuItemImageContent />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default MenuItemImageCard;
