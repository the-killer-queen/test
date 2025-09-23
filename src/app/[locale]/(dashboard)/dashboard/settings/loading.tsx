import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function OrdersLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <header className='bg-sidebar/95 flex justify-between border-b px-4 py-4 backdrop-blur'>
        <div>
          <Skeleton className='mb-2 h-6 w-44' />
          <Skeleton className='h-4 w-96' />
        </div>
        <Skeleton className='h-7 w-7' />
      </header>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <Skeleton className='mb-2 h-7 w-48' />
            <Skeleton className='mb-4 h-4 w-80' />

            {/* Actions Row */}
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex flex-wrap gap-2'>
                <Skeleton className='h-9 w-32' />
                <Skeleton className='h-9 w-28' />
                <Skeleton className='h-9 w-24' />
              </div>
              <Skeleton className='h-9 w-36' />
            </div>

            {/* Filters */}
            <div className='flex flex-wrap gap-2'>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className='h-6 w-20 rounded-full' />
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {/* Table Header */}
            <div className='mb-4 grid grid-cols-6 gap-4 border-b pb-3'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-18' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-14' />
              <Skeleton className='h-4 w-12' />
            </div>

            {/* Table Rows */}
            <div className='space-y-4'>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='grid grid-cols-6 gap-4 py-3'>
                  <Skeleton className='h-4 w-20' />
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-3 w-16' />
                  </div>
                  <Skeleton className='h-6 w-16 rounded-full' />
                  <Skeleton className='h-4 w-18' />
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-8 w-8' />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className='mt-6 flex items-center justify-between'>
              <Skeleton className='h-4 w-32' />
              <div className='flex gap-2'>
                <Skeleton className='h-8 w-8' />
                <Skeleton className='h-8 w-8' />
                <Skeleton className='h-8 w-8' />
                <Skeleton className='h-8 w-8' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default OrdersLoading;
