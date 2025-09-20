import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type H3Props = {
  children: ReactNode;
  className?: string;
};

export function H3({ children, className }: H3Props) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl leading-snug font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  );
}
