import type { ReactNode } from 'react';

export function P({ children }: { children: ReactNode }) {
  return (
    <p className='text-muted-foreground text-sm leading-relaxed text-pretty'>
      {children}
    </p>
  );
}
