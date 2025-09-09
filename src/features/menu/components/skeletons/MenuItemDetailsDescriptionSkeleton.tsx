import { Skeleton } from '@/components/ui/skeleton';

function MenuItemDetailsDescriptionSkeleton() {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-4/5' />
      <Skeleton className='h-4 w-3/4' />
    </div>
  );
}

export default MenuItemDetailsDescriptionSkeleton;
