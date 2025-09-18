'use client';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useExcludedColumnsQuery } from '@/hooks/useExcludedColumnsQuery';
import DynamicIcon from './DynamicIcon';

type TableContentHeaderProps = {
  columns: {
    value: string;
    label: string;
    icon?: string;
  }[];
};

function TableContentHeader({ columns }: TableContentHeaderProps) {
  const { excludedColumns } = useExcludedColumnsQuery();

  return (
    <TableHeader>
      <TableRow>
        {columns
          .filter((header) => !excludedColumns.includes(header.value))
          .map((header) => (
            <TableHead key={header.value} className='px-2 md:px-4'>
              <span className='flex items-center gap-0.5 text-xs md:gap-2 md:text-sm'>
                {header.icon && (
                  <DynamicIcon
                    iconName={header.icon}
                    className='size-3 md:size-4'
                  />
                )}
                <span className='hidden sm:inline md:inline'>
                  {header.label}
                </span>
                <span className='sm:hidden'>{header.label}</span>
              </span>
            </TableHead>
          ))}

        <TableHead className='px-2 md:px-4'></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default TableContentHeader;
