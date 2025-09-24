'use client';

import { Button } from '@/components/ui/button';
import LoginWithGoogleButton from '../shared/LoginWithGoogleButton';
import { useTranslations } from 'next-intl';

type SigninCTAProps = { pending: boolean };

function SigninCTA({ pending }: SigninCTAProps) {
  const t = useTranslations('auth.signin');

  return (
    <div className='flex items-center justify-between gap-3'>
      <LoginWithGoogleButton />
      <Button type='submit' className='flex-1' disabled={pending}>
        {pending ? t('form.submitButtonLoading') : t('form.submitButton')}
      </Button>
    </div>
  );
}

export default SigninCTA;
