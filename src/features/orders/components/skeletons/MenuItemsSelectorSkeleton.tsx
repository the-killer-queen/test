import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function MenuItemsSelectorSkeleton() {
  return (
    <div className='space-y-4'>
      {/* Search and Category Filter Skeleton */}
      <div className='space-y-2'>
        <Skeleton className='h-9 w-full' />
        <div className='flex flex-wrap gap-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='bg-secondary flex items-center gap-1 rounded-md px-3 py-1.5'
            >
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-4 w-16' />
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items Grid Skeleton */}
      <Card>
        <CardContent className='p-4'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-md border p-2'
              >
                <div className='flex-1'>
                  <Skeleton className='mb-1 h-4 w-24' />
                  <Skeleton className='h-3 w-16' />
                </div>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-8 w-8 rounded-md' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MenuItemsSelectorSkeleton;
