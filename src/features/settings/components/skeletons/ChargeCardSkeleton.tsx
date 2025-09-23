import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ChargeCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-6 w-40' />
            </div>
            <Skeleton className='mt-2 h-4 w-80' />
          </div>
          <Skeleton className='h-9 w-32' />
        </div>
      </CardHeader>
      <CardContent>
        {/* Table Header */}
        <div className='mb-4 grid grid-cols-4 gap-4 border-b pb-3'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-14' />
          <Skeleton className='h-4 w-12' />
        </div>

        {/* Table Rows */}
        <div className='space-y-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='grid grid-cols-4 gap-4 py-3'>
              <div>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='mt-1 h-3 w-32' />
              </div>
              <Skeleton className='h-6 w-16 rounded-full' />
              <Skeleton className='h-4 w-16' />
              <div className='flex gap-2'>
                <Skeleton className='h-8 w-8' />
                <Skeleton className='h-8 w-8' />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        <div className='mt-8 text-center'>
          <Skeleton className='mx-auto h-16 w-16 rounded-full' />
          <Skeleton className='mx-auto mt-4 h-5 w-48' />
          <Skeleton className='mx-auto mt-2 h-4 w-64' />
          <Skeleton className='mx-auto mt-4 h-9 w-32' />
        </div>
      </CardContent>
    </Card>
  );
}

export default ChargeCardSkeleton;
