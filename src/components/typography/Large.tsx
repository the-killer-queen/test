import type { ReactNode } from 'react';

export function Large({ children }: { children: ReactNode }) {
  return (
    <p className='text-lg leading-relaxed font-semibold md:text-lg'>
      {children}
    </p>
  );
}
