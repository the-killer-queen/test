import AppLogo from '@/components/shared/AppLogo';
import { Muted } from '@/components/typography/Muted';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Suspense } from 'react';
import DashboardFooter from './DashboardFooter';
import DashboardFooterSkeleton from './DashboardFooterSkeleton';
import MenuNav from './MenuNav';
import { getLocale } from 'next-intl/server';

async function DashboardSidebar() {
  const locale = await getLocale();

  return (
    <Sidebar side={locale === 'fa' ? 'right' : 'left'}>
      <SidebarHeader className='border-b !p-4'>
        <AppLogo />
      </SidebarHeader>

      <SidebarContent className='p-4'>
        <SidebarGroupLabel className='tracking-wider uppercase'>
          <Muted>Navigation</Muted>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <MenuNav />
        </SidebarGroupContent>
      </SidebarContent>

      <SidebarFooter className='border-t px-4'>
        <Suspense fallback={<DashboardFooterSkeleton />}>
          <DashboardFooter />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
