import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronsUpDown } from 'lucide-react';

function OrderTypeSelectSkeleton() {
  return (
    <Button variant='outline' className='flex-1 justify-between' disabled>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-16' />
      </div>
      <ChevronsUpDown className='opacity-50' />
    </Button>
  );
}

export default OrderTypeSelectSkeleton;
