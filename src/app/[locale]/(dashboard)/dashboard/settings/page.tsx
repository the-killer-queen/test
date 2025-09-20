import LayoutHeader from '@/components/shared/LayoutHeader';
import { SettingsContent } from '@/features/settings';

function SettingsPage() {
  return (
    <>
      <LayoutHeader
        title='Settings'
        description='Customize your dashboard preferences and manage additional charges.'
      />

      <div className='flex flex-col gap-4 p-4'>
        <SettingsContent />
      </div>
    </>
  );
}

export default SettingsPage;
