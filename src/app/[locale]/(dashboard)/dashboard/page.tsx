'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // const t = await getTranslations();
  return {
    title: 'Analytics',
  };
}

function AnalyticsPage() {
  return (
    <div>
      <SidebarTrigger />
    </div>
  );
}

export default AnalyticsPage;
