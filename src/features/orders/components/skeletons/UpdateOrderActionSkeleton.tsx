import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type UpdateOrderActionSkeletonProps = {
  className?: string;
};

function UpdateOrderActionSkeleton({
  className,
}: UpdateOrderActionSkeletonProps) {
  return (
    <Button size='sm' className={className} disabled>
      <Skeleton className='h-4 w-4 rounded' />
      <Skeleton className='h-4 w-12 rounded' />
    </Button>
  );
}

export default UpdateOrderActionSkeleton;
