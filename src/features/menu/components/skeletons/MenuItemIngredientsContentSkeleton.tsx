import { Skeleton } from '@/components/ui/skeleton';

function MenuItemIngredientsContentSkeleton() {
  return Array.from({ length: 4 }, (_, i) => (
    <div
      key={i}
      className='bg-secondary flex items-center gap-1 rounded-full px-2.5 py-0.5'
    >
      <Skeleton className='h-4 w-16' />
      <Skeleton className='h-3 w-8' />
    </div>
  ));
}

export default MenuItemIngredientsContentSkeleton;
