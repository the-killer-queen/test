'use client';

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import * as React from 'react';
import { DayButton, getDefaultClassNames } from 'react-day-picker';
import { DayPicker } from 'react-day-picker/persian';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

function CalendarLoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot='calendar'
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        '[&_*]:!font-inherit w-fit animate-pulse',
        className,
      )}
    >
      <div className='[&_*]:!font-inherit flex w-full flex-col gap-4'>
        {/* Navigation Header */}
        <div className='[&_*]:!font-inherit relative flex h-8 w-full items-center justify-between gap-1'>
          <div className='bg-muted size-8 rounded-md' />
          <div className='bg-muted h-6 w-24 rounded-md' />
          <div className='bg-muted size-8 rounded-md' />
        </div>

        {/* Calendar Grid */}
        <div className='w-full'>
          {/* Weekday Headers */}
          <div className='[&_*]:!font-inherit mb-2 flex'>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className='flex-1 text-center'>
                <div className='bg-muted mx-auto h-4 w-6 rounded' />
              </div>
            ))}
          </div>

          {/* Calendar Days - 6 weeks */}
          <div className='space-y-2'>
            {Array.from({ length: 6 }).map((_, weekIndex) => (
              <div
                key={weekIndex}
                className='[&_*]:!font-inherit flex w-full gap-0'
              >
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className='[&_*]:!font-inherit relative aspect-square h-full w-full p-0 text-center select-none'
                  >
                    <div className='flex aspect-square size-auto w-full min-w-8 flex-col items-center justify-center gap-1 leading-none font-normal'>
                      <div className='bg-muted h-4 w-6 rounded' />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CalendarComponents = {
  fa: dynamic(
    () =>
      import('react-day-picker/persian').then((mod) => ({
        default: mod.DayPicker,
      })),
    {
      loading: () => <CalendarLoadingSkeleton />,
      ssr: false,
    },
  ),

  en: dynamic(
    () =>
      import('react-day-picker').then((mod) => ({ default: mod.DayPicker })),
    {
      loading: () => <CalendarLoadingSkeleton />,
      ssr: false,
    },
  ),
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const locale = useLocale() as 'fa' | 'en';
  const defaultClassNames = getDefaultClassNames();
  const CalendarComponent = CalendarComponents[locale];

  return (
    <CalendarComponent
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        // Force font inheritance
        '[&_*]:!font-inherit',
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit [&_*]:!font-inherit', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative [&_*]:!font-inherit',
          defaultClassNames.months,
        ),
        month: cn(
          'flex flex-col w-full gap-4 [&_*]:!font-inherit',
          defaultClassNames.month,
        ),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between [&_*]:!font-inherit',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none [&_*]:!font-inherit',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none [&_*]:!font-inherit',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size) [&_*]:!font-inherit',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5 [&_*]:!font-inherit',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md [&_*]:!font-inherit',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-popover inset-0 opacity-0 [&_*]:!font-inherit',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'select-none font-medium [&_*]:!font-inherit',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse [&_*]:!font-inherit',
        weekdays: cn('flex [&_*]:!font-inherit', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none [&_*]:!font-inherit',
          defaultClassNames.weekday,
        ),
        week: cn(
          'flex w-full mt-2 [&_*]:!font-inherit',
          defaultClassNames.week,
        ),
        week_number_header: cn(
          'select-none w-(--cell-size) [&_*]:!font-inherit',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground [&_*]:!font-inherit',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none [&_*]:!font-inherit',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-md bg-accent [&_*]:!font-inherit',
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          'rounded-none [&_*]:!font-inherit',
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          'rounded-r-md bg-accent [&_*]:!font-inherit',
          defaultClassNames.range_end,
        ),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none [&_*]:!font-inherit',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground [&_*]:!font-inherit',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-muted-foreground opacity-50 [&_*]:!font-inherit',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible [&_*]:!font-inherit', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot='calendar'
              ref={rootRef}
              className={cn(className, '[&_*]:!font-inherit')}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-4', className)} {...props} />
            );
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className='[&_*]:!font-inherit flex size-(--cell-size) items-center justify-center text-center'>
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground [&_*]:!font-inherit flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
