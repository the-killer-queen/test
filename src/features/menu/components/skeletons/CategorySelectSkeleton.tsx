import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronsUpDown } from 'lucide-react';

function CategorySelectSkeleton() {
  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline' className='flex-1 justify-between' disabled>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-24' />
        </div>
        <ChevronsUpDown className='opacity-50' />
      </Button>

      <Skeleton className='h-10 w-10 rounded-md' />
    </div>
  );
}

export default CategorySelectSkeleton;
