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
  const ref = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useQueryState(name, parseAsString);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { [name]: string };

    if (!data[name]) return;

    setQuery(data[name]);
  }

  function handleResetSearch() {
    setQuery(null);
    if (ref.current) ref.current.reset();
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSearch}
      className={cn('relative flex flex-1 items-center gap-1', className)}
    >
      <div className='relative flex-1'>
        <SearchIcon className='absolute top-2.5 left-3 size-4' />
        <Input
          className='pl-9'
          defaultValue={query || ''}
          name={name}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {query && (
        <X
          onClick={handleResetSearch}
          className='hover:text-destructive absolute right-2 size-4 transition-colors duration-200 hover:cursor-pointer'
        />
      )}
    </form>
  );
}

export default Search;
