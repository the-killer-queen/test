'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, SortAscIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useSetSearchParam } from '@/hooks/use-setSearchParam';

type SortByProps = {
  options: {
    value: string;
    label: string;
  }[];
};

function SortBy({ options }: SortByProps) {
  const { setSearchParam, getSearchParam } = useSetSearchParam();
  const selectedSort = getSearchParam('sort_by');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'}>
          <SortAscIcon />
          Sort Items
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='bottom'>
        <DropdownMenuGroup className='min-w-44'>
          {options.map((option, i, array) => (
            <div key={option.value}>
              <DropdownMenuItem
                className='justify-between'
                onSelect={() =>
                  selectedSort !== option.value &&
                  setSearchParam('sort_by', option.value)
                }
              >
                {option.label}
                {selectedSort === option.value && <Check />}
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
