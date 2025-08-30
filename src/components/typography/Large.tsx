import type { ReactNode } from 'react';

export function Large({ children }: { children: ReactNode }) {
  return (
    <p className='mb-3 text-lg leading-relaxed font-semibold'>{children}</p>
  );
}
