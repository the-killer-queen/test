'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';

type OrderItemListSkeletonProps = {
  items?: number;
};

function OrderItemListSkeleton({ items = 8 }: OrderItemListSkeletonProps) {
  return (
    <div className='h-max max-h-52 overflow-y-auto'>
      <div className='grid grid-cols-1 gap-1'>
        {Array.from({ length: items }).map((_, index) => (
          <div
            key={index}
            className='bg-card hover:bg-accent/50 flex items-center rounded-lg border px-2 py-2 transition-colors md:px-3'
          >
            <div className='mr-1 md:mr-2'>
              <Avatar className='hidden h-6 w-6 md:block md:h-10 md:w-10'>
                <AvatarFallback>
                  <Skeleton className='h-4 w-4 rounded md:h-5 md:w-5' />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className='h-full flex-1'>
              <div className='flex h-full items-center justify-between'>
                <div className='flex flex-col gap-1 text-start'>
                  <Skeleton className='h-3 w-20 rounded sm:w-28 md:w-32' />

                  <Skeleton className='h-4 w-12 rounded sm:w-16 md:w-20' />
                </div>

                <div className='flex h-full items-center justify-center'>
                  {index % 3 === 0 ? (
                    <div className='flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2'>
                      <div className='flex items-center rounded-lg border'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-6 w-6 rounded-r-none border-r md:h-8 md:w-8'
                          disabled
                        >
                          <Skeleton className='h-3 w-3 rounded' />
                        </Button>

                        <div className='!bg-background m-0 flex h-6 !w-8 items-center justify-center text-center text-xs font-medium md:h-8 md:!w-14 md:text-sm'>
                          <Skeleton className='h-3 w-4 rounded md:w-6' />
                        </div>

                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6 rounded-l-none border-l md:h-8 md:w-8'
                          disabled
                        >
                          <Plus />
                        </Button>
                      </div>

                      <div className='text-right text-xs font-bold md:text-sm'>
                        <Skeleton className='h-4 w-12 rounded sm:w-16 md:w-20' />
                      </div>
                    </div>
                  ) : (
                    <Button
                      size='sm'
                      className='h-6 px-2 text-xs md:h-8 md:px-3 md:text-sm'
                      disabled
                    >
                      <Plus />
                      <span className='hidden md:inline'>
                        <Skeleton className='ml-1 h-3 w-16 rounded' />
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderItemListSkeleton;
