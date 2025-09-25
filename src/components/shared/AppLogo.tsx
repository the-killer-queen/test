import { Link } from '@/i18n/navigation';
import { H4 } from '../typography/H4';
import { Muted } from '../typography/Muted';
import { Drumstick as DrumstickIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function AppLogo() {
  const t = useTranslations('components');

  return (
    <Link className='flex items-center gap-2' href={'/dashboard'}>
      <div className='relative'>
        <DrumstickIcon className='text-primary' />
      </div>

      <div className='flex flex-col'>
        <H4>{t('appLogo.title')}</H4>
        <Muted>{t('appLogo.subtitle')}</Muted>
      </div>
    </Link>
  );
}

export default AppLogo;
