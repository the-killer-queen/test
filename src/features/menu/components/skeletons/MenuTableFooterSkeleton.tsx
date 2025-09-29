import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { PaginationContent, PaginationItem } from '@/components/ui/pagination';

function MenuTableFooterSkeleton() {
  return (
    <TableRow className='hover:!bg-transparent'>
      <TableCell colSpan={6}>
        <div className='flex items-center justify-center'>
          <PaginationContent>
            <PaginationItem>
              <div className='flex h-9 items-center justify-center px-3 py-2 text-sm'>
                <Skeleton className='h-4 w-12 rounded sm:w-16' />
              </div>
            </PaginationItem>

            <PaginationItem>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-9 w-9 rounded-md' />
                <Skeleton className='h-9 w-9 rounded-md' />
                <Skeleton className='h-9 w-9 rounded-md' />
              </div>
            </PaginationItem>

            <PaginationItem>
              <div className='flex h-9 items-center justify-center px-3 py-2 text-sm'>
                <Skeleton className='h-4 w-8 rounded sm:w-12' />
              </div>
            </PaginationItem>
          </PaginationContent>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default MenuTableFooterSkeleton;
