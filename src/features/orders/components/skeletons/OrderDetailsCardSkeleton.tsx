import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

function OrderDetailsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-20 rounded sm:w-28' />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 rounded' />
            <Skeleton className='h-4 w-16 rounded sm:w-20' />
          </div>
          <Skeleton className='h-4 w-20 rounded sm:w-32' />
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 rounded' />
            <Skeleton className='h-4 w-14 rounded sm:w-18' />
          </div>
          <Skeleton className='h-4 w-24 rounded sm:w-32' />
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 rounded' />
            <Skeleton className='h-4 w-10 rounded sm:w-14' />
          </div>

          <div className='flex items-center gap-1 px-2 py-1'>
            <Skeleton className='h-3 w-3 rounded' />
            <Skeleton className='h-3 w-12 rounded sm:w-16' />
          </div>
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 rounded' />
            <Skeleton className='h-4 w-12 rounded sm:w-16' />
          </div>

          <div className='flex items-center gap-1 px-2 py-1'>
            <Skeleton className='h-3 w-3 rounded' />
            <Skeleton className='h-3 w-8 rounded sm:w-12' />
          </div>
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 rounded' />
            <Skeleton className='h-4 w-10 rounded sm:w-14' />
          </div>
          <Skeleton className='h-4 w-16 rounded sm:w-20' />
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 rounded' />
            <Skeleton className='h-4 w-14 rounded sm:w-18' />
          </div>
          <Skeleton className='h-4 w-28 rounded sm:w-36' />
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderDetailsCardSkeleton;
