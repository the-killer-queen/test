import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar as CalendarIcon } from 'lucide-react';

function DateRangePickerSkeleton() {
  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline' className='w-32 justify-start' disabled>
        <CalendarIcon />
        <Skeleton className='h-4 w-16' />
      </Button>
    </div>
  );
}

export default DateRangePickerSkeleton;
