import type { ReactNode } from 'react';

export function H4({ children }: { children: ReactNode }) {
  return (
    <h4 className='scroll-m-20 text-xl leading-snug font-medium tracking-tight'>
      {children}
    </h4>
  );
}
