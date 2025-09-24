'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

function MenuItemsSelectorError() {
  const t = useTranslations('orders');

  return (
    <Card>
      <CardContent className='flex flex-col items-center justify-center py-12'>
        <AlertTriangle className='text-destructive mb-4 h-12 w-12' />
        <h3 className='text-foreground mb-2 text-lg font-semibold'>
          {t('menuSelector.error.title')}
        </h3>
        <p className='text-muted-foreground mb-4 text-center text-sm'>
          {t('menuSelector.error.description')}
        </p>
        <Button
          variant='outline'
          onClick={() => window.location.reload()}
          className='flex items-center gap-2'
        >
          <RefreshCw className='h-4 w-4' />
          {t('menuSelector.error.tryAgain')}
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuItemsSelectorError;
