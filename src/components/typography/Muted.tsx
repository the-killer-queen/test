import { ReactNode } from 'react';

export function Muted({ children }: { children: ReactNode }) {
  return <p className='text-muted-foreground text-sm'>{children}</p>;
}
