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
      try {
        await loginWithGoogle();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to login with your google account';
        toast.error(message);
      }
    });
  }

  return (
    <Button
      disabled={isLoading}
      variant={'outline'}
      className='flex-1'
      onClick={handleGoogleSignin}
    >
      <GoogleLogoIcon />
      {isLoading ? 'Connecting...' : 'Google'}
    </Button>
  );
}

export default LoginWithGoogleButton;
