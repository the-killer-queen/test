'use client';

import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useFiltersQuery } from '../../hooks/useFiltersQuery';

type FiltersListProps = { filterName?: string };

function FiltersList({ filterName }: FiltersListProps) {
  const { filters, setFilter } = useFiltersQuery(filterName);

  if (!(filters.length > 0)) return null;

  function handleRemoveFilter(value: string) {
    if (!(filters.length > 0)) setFilter([]);
    setFilter(filters.filter((f) => f !== value));
  }

  return (
    <div className='flex flex-wrap items-center gap-1'>
      {filters.map((filter, i) => (
        <Badge key={i} variant={'outline'} className='capitalize'>
          {filter}
          <span
            onClick={() => handleRemoveFilter(filter)}
            tabIndex={0}
            role='button'
            className='hover:text-destructive transition-colors duration-200 hover:cursor-pointer'
          >
            <X className='size-3' />
          </span>
        </Badge>
      ))}
    </div>
  );
}

export default FiltersList;
