'use client';

import { useSetSearchParam } from '@/hooks/use-setSearchParam';
import { CommandEmpty } from 'cmdk';
import { Filter } from 'lucide-react';
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
  const { setSearchParam, getSearchParam } = useSetSearchParam();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let selectedFilters = getSearchParam('filter_by')
    ? [getSearchParam('filter_by')]
    : [];

  function handleUpdateFilter(value: string) {
    selectedFilters = [...new Set([...selectedFilters, value.toLowerCase()])];
    setSearchParam('filter_by', selectedFilters.join('%'));
    setIsOpen(false);
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
          <CommandEmpty>No category found</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option, i) => (
                <CommandItem
                  key={i}
                  className='border-b'
                  onSelect={() => handleUpdateFilter(option.value)}
                >
                  <DynamicIcon iconName={option.iconName || ''} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FilterBy;
