'use client';

import { cn } from '@/lib/utils';
import { SearchIcon, X } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { ComponentProps, FormEvent, useRef } from 'react';
import { Input } from '../ui/input';

function Search({
  placeholder = 'Search...',
  name = 'query',
  className,
  ...props
}: ComponentProps<'input'>) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useQueryState(name, parseAsString.withDefault(''));

  function handleSearch(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const data = e.currentTarget.value;

    if (!data) return;
    setQuery(data);
  }

  return (
    <div className={cn('relative flex flex-1 items-center gap-1', className)}>
      <div className='relative flex-1'>
        <SearchIcon className='absolute top-3 left-2 size-3 md:left-3 md:size-4' />
        <Input
          ref={ref}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          className='pl-6 text-xs md:h-8 md:pl-9 md:text-sm'
          defaultValue={query}
          name={name}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {query && (
        <X
          onClick={() => {
            if (ref.current) ref.current.value = '';
            setQuery(null);
          }}
          className='hover:text-destructive absolute right-2 size-4 transition-colors duration-200 hover:cursor-pointer'
        />
      )}
    </div>
  );
}

export default Search;
