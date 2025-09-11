import ReactQueryProvider from '@/components/providers/ReactQueryClientProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar';

function Dashboardlayout({ children }: LayoutProps<'/'>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <section className='flex h-dvh w-full flex-col'>
        <main className='bg-background h-dvh flex-1'>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </section>
    </SidebarProvider>
  );
}

export default Dashboardlayout;
