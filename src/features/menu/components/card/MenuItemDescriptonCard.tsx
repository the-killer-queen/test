import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, FileText } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import MenuItemDetailsDescription from '../content/MenuItemDetailsDescription';
import MenuItemDetailsDescriptionSkeleton from '../skeletons/MenuItemDetailsDescriptionSkeleton';

async function MenuItemDescriptonCard() {
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
          <MenuItemDetailsDescription />
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
