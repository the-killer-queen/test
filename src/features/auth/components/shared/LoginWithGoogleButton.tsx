'use client';

import { Button } from '@/components/ui/button';
import { GoogleLogoIcon } from '@phosphor-icons/react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { loginWithGoogle } from '../../actions/loginWithOAuth';

function LoginWithGoogleButton() {
  const [isLoading, startSignin] = useTransition();

  async function handleGoogleSignin() {
    startSignin(async () => {
      const { success, error } = await loginWithGoogle();
      if (success) toast.success('Welcome back!');
      if (!success) toast.error(error);
    });
  }

  return (
    <Button
      disabled={isLoading}
      variant={'ghost'}
      className='flex-1'
      onClick={handleGoogleSignin}
    >
      <GoogleLogoIcon />
      {isLoading ? 'Connecting...' : 'Google'}
    </Button>
  );
}

export default LoginWithGoogleButton;
