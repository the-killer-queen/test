'use client';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSetSearchParam } from '@/hooks/use-setSearchParam';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

type TableColumnFilterProps = {
  options: {
    value: string;
    label: string;
    defaultVisible?: boolean;
  }[];
};

function TableColumnFilter({ options }: TableColumnFilterProps) {
  const { setSearchParam, getSearchParam, removeSearchParam } =
    useSetSearchParam();

  const isInitialLoad = !getSearchParam('excluded_columns');
  const excludedColumns = isInitialLoad
    ? options.filter((op) => op.defaultVisible === false).map((op) => op.value)
    : getSearchParam('excluded_columns')?.split('%') || [];

  const handleColumnToggle = (columnValue: string, isChecked: boolean) => {
    let newExcludedColumns: string[];

    if (isChecked)
      newExcludedColumns = excludedColumns.filter((col) => col !== columnValue);
    else
      newExcludedColumns = excludedColumns.includes(columnValue)
        ? excludedColumns
        : [...excludedColumns, columnValue];

    const columnsParam =
      newExcludedColumns.length > 0 ? newExcludedColumns.join('%') : null;
    if (columnsParam) setSearchParam('excluded_columns', columnsParam);
    else removeSearchParam('excluded_columns');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='ml-auto'>
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {options.map((option) => {
          const isChecked = isInitialLoad
            ? option.defaultVisible !== false
            : !excludedColumns.includes(option.value);

          return (
            <DropdownMenuCheckboxItem
              key={option.value}
              className='capitalize'
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleColumnToggle(option.value, checked)
              }
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
