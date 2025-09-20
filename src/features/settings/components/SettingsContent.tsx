import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import AdditionalChargesManager from './AdditionalChargesManager';

function SettingsContent() {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <LanguageSelector />
        <ThemeSelector />
      </div>
      
      <AdditionalChargesManager />
    </div>
  );
}

export default SettingsContent;