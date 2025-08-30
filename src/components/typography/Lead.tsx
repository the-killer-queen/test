import type { ReactNode } from 'react';

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className='text-muted-foreground mb-6 text-xl leading-relaxed text-pretty'>
      {children}
    </p>
  );
}
