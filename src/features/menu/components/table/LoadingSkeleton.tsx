import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Ellipsis } from 'lucide-react';

interface MenuTableSkeletonProps {
  rows?: number;
}

function LoadingSkeleton({ rows = 5 }: MenuTableSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          {/* AVATAR */}
          <TableCell>
            <Avatar>
              <AvatarFallback>
                <Skeleton className='h-4 w-4' />
              </AvatarFallback>
            </Avatar>
          </TableCell>

          <TableCell className='font-semibold'>
            <Skeleton className='h-4 w-24 lg:w-32' />
          </TableCell>

          <TableCell>
            <div className='flex items-center gap-1 capitalize'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-4 w-16 lg:w-20' />
            </div>
          </TableCell>

          <TableCell className='max-w-48 overflow-hidden text-xs lg:text-base'>
            <Skeleton className='h-3 w-32 lg:h-4 lg:w-40' />
          </TableCell>

          <TableCell>
            <div className='flex items-center justify-end'>
              <Skeleton className='h-3.5 w-3.5 lg:h-4 lg:w-4' />
              <Skeleton className='ml-1 h-4 w-12' />
            </div>
          </TableCell>

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

export default LoadingSkeleton;
