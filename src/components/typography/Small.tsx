import { ReactNode } from 'react';

export function Small({ children }: { children: ReactNode }) {
  return (
    <small className='truncate text-xs leading-none font-medium md:text-sm'>
      {children}
    </small>
  );
}
