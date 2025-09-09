import ReactQueryProvider from '@/components/providers/ReactQueryClientProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar';
import type { ReactNode } from 'react';

function Dashboardlayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <section className='flex h-dvh w-full flex-col'>
        <main className='bg-background h-dvh flex-1 overflow-auto'>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </section>
    </SidebarProvider>
  );
}

export default Dashboardlayout;
