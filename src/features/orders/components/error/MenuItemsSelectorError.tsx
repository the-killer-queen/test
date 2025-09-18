'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

function MenuItemsSelectorError() {
  return (
    <Card>
      <CardContent className='flex flex-col items-center justify-center py-12'>
        <AlertTriangle className='text-destructive mb-4 h-12 w-12' />
        <h3 className='text-foreground mb-2 text-lg font-semibold'>
          Failed to load menu items
        </h3>
        <p className='text-muted-foreground mb-4 text-center text-sm'>
          There was a problem loading the menu items. Please try again.
        </p>
        <Button
          variant='outline'
          onClick={() => window.location.reload()}
          className='flex items-center gap-2'
        >
          <RefreshCw className='h-4 w-4' />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuItemsSelectorError;
