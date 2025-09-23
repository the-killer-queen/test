import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function P({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-muted-foreground text-sm leading-relaxed text-pretty',
        className,
      )}
    >
      {children}
    </p>
  );
}
