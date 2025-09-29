import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function OrdersTableFooterSkeleton() {
  return (
    <TableRow className='hover:!bg-transparent'>
      <TableCell colSpan={9}>
        <div className='flex items-center justify-center p-4'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              disabled
              className='flex items-center gap-2'
            >
              <ChevronLeft className='h-4 w-4' />
              <Skeleton className='h-4 w-12 rounded sm:w-16' />
            </Button>

            <div className='flex items-center px-2'>
              <Skeleton className='h-4 w-16 rounded sm:w-20' />
            </div>

            <Button
              variant='outline'
              size='sm'
              disabled
              className='flex items-center gap-2'
            >
              <Skeleton className='h-4 w-8 rounded sm:w-12' />
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default OrdersTableFooterSkeleton;
