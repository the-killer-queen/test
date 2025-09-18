'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSortByQuery } from '@/hooks/useSortByQuery';
import { Check, SortAscIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

type SortByProps = {
  options: {
    value: string;
    label: string;
  }[];
};

function SortBy({ options }: SortByProps) {
  const { sortBy, setSortBy } = useSortByQuery();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string, event: Event) => {
    event.preventDefault();

    if (sortBy !== value) setSortBy(value);

    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'}>
          <SortAscIcon className='h-3 w-3 md:h-4 md:w-4' />
          <span className='hidden sm:inline'>Sort Items</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='bottom'>
        <DropdownMenuGroup className='min-w-32 md:min-w-44'>
          {options.map((option, i, array) => (
            <div key={option.value}>
              <DropdownMenuItem
                className='justify-between py-1 text-xs md:py-2 md:text-sm'
                onSelect={(event) => handleSelect(option.value, event)}
              >
                {option.label}
                {sortBy === option.value && (
                  <Check className='h-3 w-3 md:h-4 md:w-4' />
                )}
              </DropdownMenuItem>
              {i < array.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortBy;
