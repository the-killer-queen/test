import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function OrderQuickActionsCardSkeleton() {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-24 rounded sm:w-32' />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          disabled
        >
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-16 rounded sm:w-20' />
        </Button>

        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          disabled
        >
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-18 rounded sm:w-24' />
        </Button>

        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          disabled
        >
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-20 rounded sm:w-28' />
        </Button>

        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          disabled
        >
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-20 rounded sm:w-26' />
        </Button>
      </CardContent>
    </Card>
  );
}

export default OrderQuickActionsCardSkeleton;
