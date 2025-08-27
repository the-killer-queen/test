import Logo from '@/app/icon0.svg';
import Image from 'next/image';
import { H4 } from '../typography/H4';
import Link from 'next/link';

function AppLogo() {
  return (
    <Link className='flex w-min items-center gap-1' href={'/'}>
      <span className='relative size-8'>
        <Image
          loading='eager'
          src={Logo}
          alt='loopify logo'
          className='object-cover'
        />
      </span>

      <H4>Loopify</H4>
    </Link>
  );
}

export default AppLogo;
