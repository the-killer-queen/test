import type React from 'react';
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn(
        'bg-accent/40 ring-accent/15 animate-pulse rounded-lg ring-1 backdrop-blur-sm [animation-duration:1.5s]',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
