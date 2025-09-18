import { ReactNode } from 'react';

function Authlayout({ children }: { children: ReactNode }) {
  return (
    <section className='flex h-dvh w-full flex-col items-center justify-center px-5'>
      {children}
    </section>
  );
}

export default Authlayout;
