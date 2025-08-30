import type { ReactNode } from 'react';

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className='scroll-m-20 text-3xl leading-tight font-bold tracking-tight'>
      {children}
    </h2>
  );
}
