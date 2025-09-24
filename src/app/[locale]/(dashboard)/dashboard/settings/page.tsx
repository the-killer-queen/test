import LayoutHeader from '@/components/shared/LayoutHeader';
import { ChargeCard, LanguageCard, ThemeCard } from '@/features/settings';
import { getTranslations } from 'next-intl/server';

async function SettingsPage() {
  const t = await getTranslations('settings');

  return (
    <>
      <LayoutHeader
        title={t('page.title')}
        description={t('page.description')}
      />

      <div className='flex flex-col gap-4 p-4'>
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
          <LanguageCard />
          <ThemeCard />
        </div>

        <ChargeCard />
      </div>
    </>
  );
}

export default SettingsPage;
