'use client';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useExcludedColumnsQuery } from '@/features/menu/hooks/useExcludedColumnsQuery';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

type TableColumnFilterProps = {
  options: {
    value: string;
    label: string;
    defaultVisible?: boolean;
  }[];
};

function TableColumnFilter({ options }: TableColumnFilterProps) {
  const { excludedColumns, setExcludedColumns } = useExcludedColumnsQuery();
  const [isOpen, setIsOpen] = useState(false);

  const handleColumnToggle = (columnValue: string, event: Event) => {
    event.preventDefault();

    const isCurrentlyChecked =
      excludedColumns.length === 0
        ? options.find((opt) => opt.value === columnValue)?.defaultVisible !==
          false
        : !excludedColumns.includes(columnValue);

    if (isCurrentlyChecked) {
      if (!excludedColumns.includes(columnValue))
        setExcludedColumns([...excludedColumns, columnValue]);
    } else {
      setExcludedColumns(excludedColumns.filter((col) => col !== columnValue));
    }

    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' className='ml-auto'>
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {options.map((option) => {
          const isChecked =
            excludedColumns.length === 0
              ? option.defaultVisible !== false
              : !excludedColumns.includes(option.value);

          return (
            <DropdownMenuCheckboxItem
              key={option.value}
              className='capitalize'
              checked={isChecked}
              onSelect={(event) => handleColumnToggle(option.value, event)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TableColumnFilter;
