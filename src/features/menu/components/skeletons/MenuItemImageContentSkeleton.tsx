import { Skeleton } from '@/components/ui/skeleton';

function MenuItemImageContentSkeleton() {
  return (
    <div className='bg-muted flex h-full w-full items-center justify-center'>
      <Skeleton className='h-full w-full' />
    </div>
  );
}

export default MenuItemImageContentSkeleton;
