import type * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground placeholder:!text-muted-foreground/80 selection:bg-primary selection:text-primary-foreground dark:bg-input/20 !bg-background/15 ring-border/80 flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-sm ring-2 transition-all duration-200 ease-in-out outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:!ring-ring/50 focus-visible:!bg-background/20 focus-visible:shadow-md focus-visible:ring-2',
        'aria-invalid:!ring-error/80 aria-invalid:!bg-error/15 dark:aria-invalid:!ring-error/80 dark:aria-invalid:!bg-error/20',
        'hover:!bg-background/20 hover:ring-border/50 hover:shadow-md',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
