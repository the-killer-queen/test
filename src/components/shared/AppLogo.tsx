import { Link } from '@/i18n/navigation';
import { H4 } from '../typography/H4';
import { Muted } from '../typography/Muted';
import { DrumstickIcon } from 'lucide-react';

function AppLogo() {
  return (
    <Link className='flex items-center gap-2' href={'/dashboard'}>
      <div className='relative'>
        <DrumstickIcon className='text-primary' />
      </div>

      <div className='flex flex-col'>
        <H4>CafeCtrl</H4>
        <Muted>Dashboard</Muted>
      </div>
    </Link>
  );
}

export default AppLogo;
