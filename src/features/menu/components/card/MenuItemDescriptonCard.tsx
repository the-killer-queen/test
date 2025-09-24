import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, FileText } from 'lucide-react';
import MenuItemDetailsDescription from '../content/MenuItemDetailsDescription';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import MenuItemDetailsDescriptionSkeleton from '../skeletons/MenuItemDetailsDescriptionSkeleton';
import { getTranslations } from 'next-intl/server';

async function MenuItemDescriptonCard({ menuId }: { menuId: string }) {
  const t = await getTranslations('menu');

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <FileText className='h-4 w-4' />
          {t('cards.description.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<MenuItemDetailsDescriptionSkeleton />}>
          <MenuItemDetailsDescription menuId={menuId} />
        </Suspense>

        <Button size='sm' variant='outline' className='mt-4'>
          <Brain />
          {t('cards.description.generateAI')}
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuItemDescriptonCard;
