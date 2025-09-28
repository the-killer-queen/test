import { Skeleton } from '@/components/ui/skeleton';

function TotalPriceContentSkeleton() {
  return (
    <div className='flex items-center justify-between'>
      <Skeleton className='h-4 w-12 rounded sm:w-16' />
      <Skeleton className='h-5 w-16 rounded sm:w-20' />
    </div>
  );
}

export default TotalPriceContentSkeleton;
