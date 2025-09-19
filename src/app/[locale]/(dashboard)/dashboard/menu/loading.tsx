import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function MenuLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <header className='bg-sidebar/95 flex justify-between border-b px-4 py-[17px] backdrop-blur'>
        <div>
          <Skeleton className='mb-2 h-6 w-48' />
          <Skeleton className='h-4 w-80' />
        </div>
        <Skeleton className='h-7 w-7' />
      </header>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-4 w-64' />

            {/* Actions Skeleton */}
            <div className='my-2 flex flex-col-reverse gap-2 lg:flex-row'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-9 w-24' />
                <Skeleton className='h-9 w-24' />
                <Skeleton className='h-9 w-20' />
              </div>

              <div className='flex w-full items-center gap-2'>
                <Skeleton className='h-9 flex-1' />
                <Skeleton className='h-9 w-32' />
              </div>
            </div>

            {/* Filters Skeleton */}
            <div className='flex items-center gap-1'>
              <Skeleton className='h-6 w-16 rounded-full' />
              <Skeleton className='h-6 w-20 rounded-full' />
              <Skeleton className='h-6 w-18 rounded-full' />
            </div>
          </CardHeader>

          <CardContent>
            {/* Table Skeleton */}
            <div className='rounded-md border'>
              <div className='w-full'>
                {/* Table Header */}
                <div className='border-b'>
                  <div className='flex h-10 items-center px-2'>
                    <div className='flex w-full items-center gap-4'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                      <Skeleton className='h-4 w-16' />
                      <Skeleton className='h-4 w-20' />
                      <Skeleton className='h-4 w-24' />
                      <Skeleton className='h-4 w-16' />
                    </div>
                  </div>
                </div>

                {/* Table Body */}
                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className='hover:bg-muted/50 border-b transition-colors'
                    >
                      <div className='flex h-16 items-center px-2'>
                        <div className='flex w-full items-center gap-4'>
                          <Skeleton className='h-10 w-10 rounded-full' />
                          <Skeleton className='h-4 w-32' />
                          <div className='flex items-center gap-1'>
                            <Skeleton className='h-4 w-4' />
                            <Skeleton className='h-4 w-20' />
                          </div>
                          <div className='flex gap-1'>
                            <Skeleton className='h-6 w-16 rounded-full' />
                            <Skeleton className='h-6 w-20 rounded-full' />
                            <Skeleton className='h-6 w-18 rounded-full' />
                          </div>
                          <Skeleton className='h-4 w-16' />
                          <Skeleton className='ml-auto h-4 w-4' />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MenuLoading;
