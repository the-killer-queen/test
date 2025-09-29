'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useExcludedColumnsQuery } from '@/hooks/useExcludedColumnsQuery';
import { Ellipsis } from 'lucide-react';

type MenuTableSkeletonProps = {
  rows?: number;
};

function MenuTableSkeleton({ rows = 10 }: MenuTableSkeletonProps) {
  const { excludedColumns } = useExcludedColumnsQuery();

  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          {!excludedColumns.includes('menu_item_picture') && (
            <TableCell className='px-2 md:px-4'>
              <Avatar>
                <AvatarFallback>
                  <Skeleton className='h-8 w-8 rounded-full' />
                </AvatarFallback>
              </Avatar>
            </TableCell>
          )}

          <TableCell className='px-2 md:px-4'>
            <Skeleton className='h-4 w-24 rounded sm:w-32 md:w-40' />
          </TableCell>

          {!excludedColumns.includes('category') && (
            <TableCell className='px-2 md:px-4'>
              <div className='flex items-center gap-0.5 md:gap-2'>
                <Skeleton className='h-3 w-3 rounded md:h-4 md:w-4' />
                <Skeleton className='h-3 w-16 rounded sm:w-20 md:h-4 md:w-24' />
              </div>
            </TableCell>
          )}

          {!excludedColumns.includes('ingredients') && (
            <TableCell className='w-max overflow-hidden'>
              <div className='flex items-center gap-1'>
                <div className='flex items-center gap-1 rounded-md px-2 py-1'>
                  <Skeleton className='h-3 w-12 rounded sm:w-16' />
                </div>
                <div className='flex items-center gap-1 rounded-md px-2 py-1'>
                  <Skeleton className='h-3 w-10 rounded sm:w-14' />
                </div>
                <div className='flex items-center gap-1 rounded-md px-2 py-1'>
                  <Skeleton className='h-3 w-8 rounded sm:w-12' />
                </div>
              </div>
            </TableCell>
          )}

          <TableCell className='px-2 md:px-4'>
            <div className='flex items-center'>
              <Skeleton className='h-4 w-12 rounded sm:w-16 md:w-20' />
            </div>
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

export default MenuTableSkeleton;
