import type { ReactNode } from 'react';

export function Large({ children }: { children: ReactNode }) {
  return <p className='text-lg leading-relaxed font-semibold'>{children}</p>;
}
