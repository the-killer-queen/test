import type * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground placeholder:!text-muted-foreground/60 selection:bg-primary selection:text-primary-foreground bg-background/60 border-border/40 flex h-11 w-full min-w-0 rounded-lg border px-4 py-3 text-base backdrop-blur-sm transition-colors duration-200 ease-out outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-primary/60 focus-visible:bg-background/90 focus-visible:ring-primary/40 focus-visible:ring-2',
        'aria-invalid:border-error/60 aria-invalid:bg-error/10 dark:aria-invalid:border-error/60 dark:aria-invalid:bg-error/15',
        'hover:bg-background/80 hover:border-primary/30',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
