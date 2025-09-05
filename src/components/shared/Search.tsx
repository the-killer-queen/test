'use client';

import { useSetSearchParam } from '@/hooks/use-setSearchParam';
import { ComponentProps, FormEvent, useRef } from 'react';
import { Input } from '../ui/input';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

function Search({
  placeholder = 'Search...',
  name = 'query',
  className,
  ...props
}: ComponentProps<'input'>) {
  const ref = useRef<HTMLFormElement>(null);
  const { getSearchParam, setSearchParam, removeSearchParam } =
    useSetSearchParam();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { [name]: string };

    if (!data[name]) return;

    setSearchParam(name, data[name]);
  }

  function handleResetSearch() {
    removeSearchParam(name);
    if (ref.current) ref.current.reset();
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSearch}
      className={cn('relative flex flex-1 items-center gap-1', className)}
    >
      <Input name={name} placeholder={placeholder} {...props} />

      {getSearchParam(name) && (
        <X
          onClick={handleResetSearch}
          className='hover:text-destructive absolute right-2 size-4 transition-colors duration-200 hover:cursor-pointer'
        />
      )}
    </form>
  );
}

export default Search;
