import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function OrderNotesCardSkeleton() {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-16 rounded sm:w-20' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full rounded' />
          <Skeleton className='h-4 w-4/5 rounded' />
          <Skeleton className='h-4 w-3/4 rounded' />
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderNotesCardSkeleton;
