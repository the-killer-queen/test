'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WarningCircleIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

type AuthErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function AuthError({ error, reset }: AuthErrorProps) {
  const t = useTranslations('Auth.Error');

  return (
    <div className='w-full max-w-sm'>
      <Card>
        <CardHeader className='text-center'>
          <div className='!bg-destructive/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full'>
            <WarningCircleIcon className='!text-destructive h-6 w-6' />
          </div>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>
            {t('description')} {error.message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={reset} className='w-full' variant='outline'>
            {t('tryAgainButton')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthError;
