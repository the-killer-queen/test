'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WarningCircleIcon } from '@phosphor-icons/react';

type OrderViewErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function OrderViewError({ error, reset }: OrderViewErrorProps) {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader className='text-center'>
            <div className='!bg-destructive/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full'>
              <WarningCircleIcon className='!text-destructive h-6 w-6' />
            </div>
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription>
              We encountered an error while loading the order details. Please
              try again. {error.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={reset} className='w-full' variant='outline'>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrderViewError;
