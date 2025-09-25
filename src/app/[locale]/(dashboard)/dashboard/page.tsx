import { SidebarTrigger } from '@/components/ui/sidebar';
import { getTranslations } from 'next-intl/server';

async function DashboardPage() {
  const t = await getTranslations('dashboard');

  return (
    <div>
      <SidebarTrigger />
      {t('welcome')}
    </div>
  );
}

export default DashboardPage;
