import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

function OrderItemsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-24 rounded sm:w-32' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-6 w-8 rounded-md sm:w-10' />
                  <Skeleton className='h-4 w-20 rounded sm:w-32 md:w-40' />
                </div>
                <div className='flex flex-col items-end gap-1'>
                  <Skeleton className='h-4 w-12 rounded sm:w-16' />
                  <div className='flex items-center gap-1'>
                    <Skeleton className='h-3 w-3 rounded' />
                    <Skeleton className='h-3 w-8 rounded sm:w-12' />
                    <Skeleton className='h-3 w-6 rounded sm:w-8' />
                  </div>
                </div>
              </div>
              {index < 2 && <Separator className='mt-3' />}
            </div>
          ))}

          <Separator className='my-4' />
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItemsCardSkeleton;
