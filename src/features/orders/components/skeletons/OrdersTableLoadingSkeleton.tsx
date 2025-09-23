import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Ellipsis } from 'lucide-react';

interface OrdersTableSkeletonProps {
  rows?: number;
}

function OrdersTableLoadingSkeleton({ rows = 10 }: OrdersTableSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          {/* ORDER ID */}
          <TableCell className='font-semibold'>
            <Skeleton className='h-4 w-12' />
          </TableCell>

          {/* CUSTOMER NAME */}
          <TableCell>
            <Skeleton className='h-4 w-24 lg:w-32' />
          </TableCell>

          {/* CUSTOMER CONTACT */}
          <TableCell>
            <Skeleton className='h-4 w-20 lg:w-28' />
          </TableCell>

          {/* ORDER TYPE */}
          <TableCell>
            <div className='bg-secondary flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5'>
              <Skeleton className='h-3 w-3' />
              <Skeleton className='h-3 w-12' />
            </div>
          </TableCell>

          {/* ITEMS COUNT */}
          <TableCell>
            <Skeleton className='h-3 w-16' />
          </TableCell>

          {/* STATUS */}
          <TableCell>
            <div className='bg-secondary flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5'>
              <Skeleton className='h-3 w-3' />
              <Skeleton className='h-3 w-10' />
            </div>
          </TableCell>

          {/* TOTAL PRICE */}
          <TableCell>
            <Skeleton className='h-4 w-16' />
          </TableCell>

          {/* CREATED AT */}
          <TableCell>
            <Skeleton className='h-3 w-20' />
          </TableCell>

          {/* ACTIONS */}
          <TableCell className='text-end'>
            <Button variant='ghost' className='h-0 w-0' disabled>
              <Ellipsis className='opacity-30' />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default OrdersTableLoadingSkeleton;
