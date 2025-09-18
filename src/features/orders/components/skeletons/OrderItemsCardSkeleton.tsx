import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart } from 'lucide-react';

function OrderItemsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <ShoppingCart className='h-4 w-4' />
          Order Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='bg-secondary rounded-full px-2 py-1'>
                    <Skeleton className='h-3 w-4' />
                  </div>
                  <Skeleton className='h-4 w-24' />
                </div>
                <div className='flex flex-col items-end gap-1'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-3 w-12' />
                </div>
              </div>
              {index < 2 && <Separator className='mt-3' />}
            </div>
          ))}

          <Separator className='my-4' />

          <div className='flex items-center justify-between'>
            <span className='text-base font-semibold'>Total</span>
            <Skeleton className='h-5 w-20' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItemsCardSkeleton;
