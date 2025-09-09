import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Suspense } from 'react';
import MenuItemDetailsContentSkeleton from '../skeletons/MenuItemDetailsContentSkeleton';
import MenuItemDetailsContent from '../content/MenuItemDetailsContent';

function MenuItemDetailsCard({ menuId }: { menuId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Info className='h-4 w-4' />
          Item Details
        </CardTitle>
      </CardHeader>
      <Suspense fallback={<MenuItemDetailsContentSkeleton />}>
        <MenuItemDetailsContent menuId={menuId} />
      </Suspense>
    </Card>
  );
}

export default MenuItemDetailsCard;
