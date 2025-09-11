'use client';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';

function CategoriesListSkeleton() {
  return (
    <Command>
      <CommandInput placeholder='Search categories...' disabled />

      <CommandList>
        <CommandGroup>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='flex items-center justify-between border-b px-2 py-1.5'
            >
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-4' />

                <Skeleton
                  className='h-4'
                  style={{ width: `${80 + ((index * 20) % 60)}px` }}
                />
              </div>

              <Skeleton className='h-4 w-4' />
            </div>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default CategoriesListSkeleton;
