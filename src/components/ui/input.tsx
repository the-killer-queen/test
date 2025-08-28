import type * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground placeholder:!text-muted-foreground/60 selection:bg-primary selection:text-primary-foreground bg-background/50 ring-border/50 flex h-10 w-full min-w-0 rounded-lg px-3 py-2 text-base shadow-sm ring-2 backdrop-blur-sm transition-all duration-300 ease-out outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:!ring-primary/50 focus-visible:!bg-background/80 focus-visible:scale-[1.01] focus-visible:shadow-lg focus-visible:ring-2',
        'aria-invalid:!ring-error/60 aria-invalid:!bg-error/10 dark:aria-invalid:!ring-error/60 dark:aria-invalid:!bg-error/15',
        'hover:!bg-background/70 hover:ring-primary/20 hover:scale-[1.005] hover:shadow-md',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
