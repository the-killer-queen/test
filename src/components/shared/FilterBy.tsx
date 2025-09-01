'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSetSearchParam } from '@/hooks/use-setSearchParam';
import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
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
  let selectedFilters = getSearchParam('filter_by')
    ? [getSearchParam('filter_by')]
    : [];

  function handleUpdateFilter(value: string) {
    selectedFilters = [...new Set([...selectedFilters, value.toLowerCase()])];
    setSearchParam('filter_by', selectedFilters.join('%'));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'}>
          <Filter />
          Apply Filter
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='bottom'>
        <DropdownMenuGroup>
          {options.map((option, i, array) => (
            <div key={option.value}>
              <DropdownMenuItem
                onSelect={() => handleUpdateFilter(option.value)}
              >
                <DynamicIcon iconName={option.iconName || ''} />
                {option.label}
              </DropdownMenuItem>
              {i < array.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterBy;
