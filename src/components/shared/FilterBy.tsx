'use client';

import { useFiltersQuery } from '@/features/menu/hooks/useFiltersQuery';
import { CommandEmpty } from 'cmdk';
import { Check, Filter, Inbox } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import DynamicIcon from './DynamicIcon';

type FilterByProps = {
  options: {
    value: string;
    label: string;
    iconName?: string;
  }[];
};

function FilterBy({ options }: FilterByProps) {
  const { filters, setFilter } = useFiltersQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleUpdateFilter(value: string) {
    if (filters.includes(value.toLowerCase()))
      setFilter(filters.filter((filter) => filter !== value.toLowerCase()));
    else setFilter([...new Set([...filters, value.toLowerCase()])]);

    setTimeout(() => setIsOpen(false), 10);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button role='combobox' variant={'secondary'}>
          <Filter />
          Apply Filter
        </Button>
      </PopoverTrigger>

      <PopoverContent side='bottom' className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandEmpty className='flex justify-center'>
            <span className='text-muted-foreground flex items-center gap-2 px-2 py-1.5 text-sm font-medium'>
              <Inbox className='size-4' />
              No categories available
            </span>
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option, i) => {
                const selectedFilter = filters.find(
                  (f) =>
                    f?.toLocaleLowerCase() === option.value.toLocaleLowerCase(),
                );

                return (
                  <CommandItem
                    key={i}
                    className='justify-between border-b'
                    onSelect={() => handleUpdateFilter(option.value)}
                  >
                    <span className='flex gap-1'>
                      <DynamicIcon iconName={option.iconName || ''} />
                      {option.label}
                    </span>
                    {selectedFilter && <Check />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FilterBy;
