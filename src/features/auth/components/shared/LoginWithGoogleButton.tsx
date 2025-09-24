'use client';

import { Button } from '@/components/ui/button';
import { GoogleLogoIcon } from '@phosphor-icons/react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { loginWithGoogle } from '../../actions/loginWithOAuth';
import { useTranslations } from 'next-intl';

function LoginWithGoogleButton() {
  const t = useTranslations('auth.oauth.google');
  const [isLoading, startSignin] = useTransition();

  async function handleGoogleSignin() {
    startSignin(async () => {
      const { success, error } = await loginWithGoogle();
      if (success) toast.success(t('success'));
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
      {isLoading ? t('buttonLoading') : t('button')}
    </Button>
  );
}

export default LoginWithGoogleButton;
