import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Calendar,
  ChartColumnStacked,
  DollarSign,
  TagIcon,
} from 'lucide-react';

function MenuItemDetailsContentSkeleton() {
  return (
    <CardContent className='space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <TagIcon className='size-4' />
          Name
        </span>
        <Skeleton className='h-4 w-20' />
      </div>

      <Separator />

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <DollarSign className='size-4' />
          Price
        </span>
        <Skeleton className='h-4 w-12' />
      </div>

      <Separator />

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <ChartColumnStacked className='size-4' />
          Category
        </span>
        <div className='bg-secondary flex items-center gap-1 rounded-full px-2.5 py-0.5'>
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 w-16' />
        </div>
      </div>

      <Separator />

      <div className='flex items-center justify-between'>
        <span className='text-muted-foreground flex items-center gap-1 text-sm'>
          <Calendar className='size-4' />
          Created
        </span>
        <Skeleton className='h-4 w-24' />
      </div>
    </CardContent>
  );
}

export default MenuItemDetailsContentSkeleton;
