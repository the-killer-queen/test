import LayoutHeader from '@/components/shared/LayoutHeader';
import { ChargeCard, LanguageCard, ThemeCard } from '@/features/settings';

function SettingsPage() {
  return (
    <>
      <LayoutHeader
        title='Settings'
        description='Customize your dashboard preferences and manage additional charges.'
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
