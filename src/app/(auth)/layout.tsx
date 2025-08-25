import { ReactNode } from 'react';

function Authlayout({ children }: { children: ReactNode }) {
  return (
    <section className='flex h-dvh w-full flex-col items-center justify-center'>
      {children}
    </section>
  );
}

export default Authlayout;
