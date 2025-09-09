import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, FileText } from 'lucide-react';
import MenuItemDetailsDescription from '../content/MenuItemDetailsDescription';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import MenuItemDetailsDescriptionSkeleton from '../skeletons/MenuItemDetailsDescriptionSkeleton';

async function MenuItemDescriptonCard({ menuId }: { menuId: string }) {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <FileText className='h-4 w-4' />
          Description
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<MenuItemDetailsDescriptionSkeleton />}>
          <MenuItemDetailsDescription menuId={menuId} />
        </Suspense>

        <Button size='sm' variant='outline' className='mt-4'>
          <Brain />
          Generate with AI
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuItemDescriptonCard;
