import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function OrderViewLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <header className='bg-sidebar/95 flex justify-between border-b px-4 py-[17px] backdrop-blur'>
        <div>
          <Skeleton className='mb-2 h-6 w-48' />
          <Skeleton className='h-4 w-80' />
        </div>

        <div className='flex items-center'>
          <Skeleton className='mr-2 h-8 w-20' />
          <Skeleton className='h-7 w-7' />
        </div>
      </header>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-9 w-28' />
            </div>
            <Skeleton className='h-4 w-80' />
          </CardHeader>

          <CardContent>
            <div className='grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2'>
              {/* Order Items Card Skeleton */}
              <div className='w-full'>
                <Card>
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' />
                      <Skeleton className='h-5 w-32' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <div className='bg-secondary rounded-full px-2 py-1'>
                                <Skeleton className='h-3 w-4' />
                              </div>
                              <Skeleton className='h-4 w-24' />
                            </div>
                            <div className='flex flex-col items-end gap-1'>
                              <Skeleton className='h-4 w-16' />
                              <Skeleton className='h-3 w-12' />
                            </div>
                          </div>
                          {index < 2 && <div className='bg-border my-3 h-px' />}
                        </div>
                      ))}

                      <div className='bg-border my-4 h-px' />

                      <div className='flex items-center justify-between'>
                        <span className='text-base font-semibold'>Total</span>
                        <Skeleton className='h-5 w-20' />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className='flex w-full flex-col space-y-4'>
                {/* Order Details Card Skeleton */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' />
                      <Skeleton className='h-5 w-28' />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index}>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-1'>
                            <Skeleton className='h-4 w-4' />
                            <Skeleton className='h-4 w-16' />
                          </div>
                          <Skeleton className='h-4 w-20' />
                        </div>
                        {index < 5 && <div className='bg-border my-2 h-px' />}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className='flex w-full flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row'>
                  {/* Quick Actions Card Skeleton */}
                  <Card className='flex-1'>
                    <CardHeader>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-4 w-4' />
                        <Skeleton className='h-5 w-28' />
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className='h-8 w-full' />
                      ))}
                    </CardContent>
                  </Card>

                  {/* Notes Card Skeleton */}
                  <Card className='flex-1'>
                    <CardHeader>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-4 w-4' />
                        <Skeleton className='h-5 w-16' />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-full' />
                        <Skeleton className='h-4 w-4/5' />
                        <Skeleton className='h-4 w-3/4' />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default OrderViewLoading;
