'use client';

import { Button } from '@/components/ui/button';
import LoginWithGoogleButton from '../shared/LoginWithGoogleButton';

type SigninCTAProps = { pending: boolean };

function SigninCTA({ pending }: SigninCTAProps) {
  return (
    <div className='flex items-center justify-between gap-3'>
      <LoginWithGoogleButton />
      <Button type='submit' className='flex-1' disabled={pending}>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    </div>
  );
}

export default SigninCTA;
