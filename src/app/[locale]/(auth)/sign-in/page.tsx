'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SigninForm } from '@/features/auth';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

function SigninPage() {
  const t = useTranslations('Auth.SignIn');

  return (
    <div className='w-full max-w-sm'>
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>

        <CardContent>
          <SigninForm />

          <p className='text-muted-foreground mt-4 flex items-center justify-center gap-1 text-sm'>
            {t('noAccount')}
            <Button variant='link' className='p-0'>
              <Link href='/sign-up'>{t('signUpLink')}</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SigninPage;
