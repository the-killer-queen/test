'use client';

import { Badge } from '@/components/ui/badge';
import { useSetSearchParam } from '@/hooks/use-setSearchParam';
import { X } from 'lucide-react';

function MenuFiltersList() {
  const { getSearchParam, setSearchParam, removeSearchParam } =
    useSetSearchParam();
  const filters = getSearchParam('filter_by');
  let selectedFilters = filters ? filters.split('%') : [];

  if (!(selectedFilters.length > 0)) return null;

  function handleRemoveFilter(value: string) {
    selectedFilters = selectedFilters?.filter((f) => f !== value);
    setSearchParam('filter_by', selectedFilters.join('%'));

    if (!(selectedFilters.length > 0)) removeSearchParam('filter_by');
  }

  return (
    <div className='flex items-center gap-1'>
      {selectedFilters.map((filter, i) => (
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
