'use client';

import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useFiltersQuery } from '../../hooks/useFiltersQuery';

function MenuFiltersList() {
  const { filters, setFilter } = useFiltersQuery();

  if (!(filters.length > 0)) return null;

  function handleRemoveFilter(value: string) {
    if (!(filters.length > 0)) setFilter([]);
    setFilter(filters.filter((f) => f !== value));
  }

  return (
    <div className='flex items-center gap-1'>
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

export default MenuFiltersList;
