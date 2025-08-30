import type { ReactNode } from 'react';

export function Muted({ children }: { children: ReactNode }) {
  return (
    <p className='text-muted-foreground text-sm leading-relaxed tracking-wide'>
      {children}
    </p>
  );
}
