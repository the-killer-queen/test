import { ReactNode } from 'react';

export function Lead({ children }: { children: ReactNode }) {
  return <p className='text-muted-foreground text-xl'>{children}</p>;
}
