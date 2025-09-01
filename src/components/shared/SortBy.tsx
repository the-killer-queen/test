'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SortAscIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useSetSearchParam } from '@/hooks/use-setSearchParam';

type SortByProps = {
  options: {
    value: string;
    label: string;
  }[];
};

function SortBy({ options }: SortByProps) {
  const { setSearchParam } = useSetSearchParam();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'}>
          <SortAscIcon />
          Sort Items
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='bottom'>
        <DropdownMenuGroup>
          {options.map((option, i, array) => (
            <div key={option.value}>
              <DropdownMenuItem
                onSelect={() => setSearchParam('sort_by', option.value)}
              >
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

export default SortBy;
