import LayoutHeader from '@/components/shared/LayoutHeader';
import { AnalyticsContent, PeriodSelector } from '@/features/analytics';
import { Suspense } from 'react';
import DashboardLoading from './loading';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('analytics');
  return {
    title: t('page.title'),
    description: t('page.description'),
  };
}

async function AnalyticsPage() {
  const t = await getTranslations('analytics');

  return (
    <>
      <LayoutHeader
        title={t('page.title')}
        description={t('page.description')}
      >
        <PeriodSelector />
      </LayoutHeader>

      <div className='flex flex-col gap-4 p-4'>
        <Suspense fallback={<DashboardLoading />}>
          <AnalyticsContent />
        </Suspense>
      </div>
    </>
  );
}

export default AnalyticsPage;
