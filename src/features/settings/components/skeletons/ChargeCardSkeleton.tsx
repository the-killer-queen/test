import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type ChargeListCardSkeletonProps = {
  count?: number;
};

function ChargeListCardSkeleton({ count = 3 }: ChargeListCardSkeletonProps) {
  return (
    <CardContent className='space-y-4'>
      <div className='space-y-2'>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className='border-border bg-card flex flex-col gap-2 rounded-xl border p-2 sm:flex-row sm:items-center sm:justify-between'
          >
            <div className='flex items-center gap-2'>
              <Skeleton className='h-8 w-8 rounded-xl' />

              <div className='flex-1 space-y-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-32' />

                  {index % 2 === 0 && (
                    <Skeleton className='h-5 w-12 rounded-full' />
                  )}
                </div>

                <Skeleton className='h-3 w-48' />
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Skeleton className='h-6 w-11 rounded-full' />

              <div className='flex items-center'>
                <Skeleton className='h-10 w-10 rounded-md' />

                <Skeleton className='h-10 w-10 rounded-md' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
}

export default ChargeListCardSkeleton;
