import type { ReactNode } from 'react';

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className='scroll-m-20 text-4xl leading-tight font-extrabold tracking-tight text-balance'>
      {children}
    </h1>
  );
}
