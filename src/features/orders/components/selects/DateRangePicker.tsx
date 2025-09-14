'use client';

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

function DateRangePicker() {
  const { ordersDate, isPending, error } = useGetOrdersDate();
  const [selectedDate, setSelectedDate] = useQueryState(
    'selected_date',
    parseAsString
      .withDefault(formatISO(new Date()).split('T')[0])
      .withOptions({ shallow: false }),
  );
  const [isOpen, setIsOpen] = useState(false);

  if (isPending) return <p>it must be a skeleton!!!</p>;
  if (error || !ordersDate) return <p>it must be a error state!!!</p>;

  function handleSelectDate(newDate: Date | undefined) {
    if (newDate) {
      setSelectedDate(formatISO(newDate).split('T')[0]);
      setTimeout(() => setIsOpen(false), 10);
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-32 justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
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
            className='[&_.rdp-day]:mx-[0.5px]'
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

      {/* Quick Date Buttons */}
      {/* <div className='flex gap-1'>
        {quickDateOptions.map((option) => (
          <Button
            key={option.label}
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(option.value);
              setIsOpen(false);
            }}
            className={cn(
              'text-xs',
              format(date, 'yyyy-MM-dd') ===
                format(option.value, 'yyyy-MM-dd') &&
                'bg-primary text-primary-foreground',
            )}
          >
            {option.label}
          </Button>
        ))}
      </div> */}
    </div>
  );
}

export default DateRangePicker;
