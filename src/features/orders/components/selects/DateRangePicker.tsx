'use client';

import ErrorState from '@/components/shared/ErrorState';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, formatISO, isToday } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import { useGetOrdersDate } from '../../hooks/useGetOrdersDate';
import DateRangePickerSkeleton from '../skeletons/DateRangePickerSkeleton';

function DateRangePicker() {
  const { ordersDate, isPending, error } = useGetOrdersDate();
  const [selectedDate, setSelectedDate] = useQueryState(
    'selected_date',
    parseAsString
      .withDefault(formatISO(new Date()).split('T')[0])
      .withOptions({ shallow: false }),
  );
  const [isOpen, setIsOpen] = useState(false);

  if (isPending) return <DateRangePickerSkeleton />;
  if (error || !ordersDate) return <ErrorState message='Error' />;

  function handleSelectDate(newDate: Date | undefined) {
    if (newDate) {
      setSelectedDate(formatISO(newDate).split('T')[0]);
      setTimeout(() => setIsOpen(false), 10);
    }
  }

  return (
    <div className='flex items-center gap-1 md:gap-2'>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-28 justify-start px-2 text-left text-xs font-normal md:w-32 md:px-3 md:text-sm',
              !selectedDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='h-3 w-3 md:h-4 md:w-4' />
            {selectedDate ? (
              isToday(selectedDate) ? (
                'Today'
              ) : (
                format(selectedDate, 'PP')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='center'>
          <Calendar
            className='[&_tr]:gap-1'
            modifiers={{
              highlighted: ordersDate.map((order) => new Date(order)),
            }}
            modifiersClassNames={{
              highlighted: 'bg-accent rounded-lg',
            }}
            mode='single'
            selected={new Date(selectedDate)}
            onSelect={handleSelectDate}
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
