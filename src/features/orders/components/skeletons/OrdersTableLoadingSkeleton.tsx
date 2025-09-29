'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useExcludedColumnsQuery } from '@/hooks/useExcludedColumnsQuery';
import { Ellipsis } from 'lucide-react';

type OrdersTableSkeletonProps = {
  rows?: number;
};

function OrdersTableSkeleton({ rows = 10 }: OrdersTableSkeletonProps) {
  const { excludedColumns } = useExcludedColumnsQuery();

  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index} className='cursor-pointer'>
          <TableCell className='px-2 md:px-4'>
            <Button
              variant='outline'
              disabled
              className='flex items-center gap-1'
            >
              <span>#</span>
              <Skeleton className='h-4 w-16 rounded sm:w-20' />
            </Button>
          </TableCell>

          <TableCell className='px-2 md:px-4'>
            <Skeleton className='h-4 w-20 rounded sm:w-28 md:w-32' />
          </TableCell>

          {!excludedColumns.includes('customer_contact') && (
            <TableCell className='px-2 md:px-4'>
              <Skeleton className='h-3 w-24 rounded sm:w-32' />
            </TableCell>
          )}

          {!excludedColumns.includes('order_type') && (
            <TableCell className='px-2 md:px-4'>
              <div className='flex items-center gap-1 rounded-md border px-2 py-1'>
                <Skeleton className='h-3 w-3 rounded' />
                <Skeleton className='h-3 w-12 rounded sm:w-16' />
              </div>
            </TableCell>
          )}

          {!excludedColumns.includes('items_count') && (
            <TableCell className='px-2 md:px-4'>
              <Skeleton className='h-3 w-12 rounded sm:w-16' />
            </TableCell>
          )}

          {!excludedColumns.includes('status') && (
            <TableCell className='px-2 md:px-4'>
              <div className='flex items-center gap-1 rounded-md border px-2 py-1'>
                <Skeleton className='h-3 w-3 rounded' />
                <Skeleton className='h-3 w-10 rounded sm:w-14' />
              </div>
            </TableCell>
          )}

          <TableCell className='px-2 md:px-4'>
            <Skeleton className='h-4 w-14 rounded sm:w-18 md:w-20' />
          </TableCell>

          <TableCell className='px-2 md:px-4'>
            <Skeleton className='h-3 w-20 rounded sm:w-24' />
          </TableCell>

          <TableCell className='px-2 text-end md:px-4'>
            <Button variant='ghost' className='h-0 w-0' disabled>
              <Ellipsis />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default OrdersTableSkeleton;
