'use client';

import { useSetSearchParam } from '@/hooks/use-setSearchParam';
import { CommandEmpty } from 'cmdk';
import { Check, Filter } from 'lucide-react';
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
    ? getSearchParam('filter_by')!.split('%')
    : [];

  function handleUpdateFilter(value: string) {
    if (selectedFilters.includes(value.toLowerCase())) return setIsOpen(false);

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
              {options.map((option, i) => {
                const selectedFilter = selectedFilters.find(
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
