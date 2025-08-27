import { ReactNode } from 'react';

export function Small({ children }: { children: ReactNode }) {
  return <small className='text-sm leading-none font-medium'>{children}</small>;
}
