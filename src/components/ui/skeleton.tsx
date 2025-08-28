import type React from 'react';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn(
        'bg-accent/30 ring-accent/20 animate-pulse rounded-lg ring-2 backdrop-blur-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
