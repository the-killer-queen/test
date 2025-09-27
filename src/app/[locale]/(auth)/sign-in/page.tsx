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
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // const t = await getTranslations();
  return {
    title: 'Sign in',
  };
}

async function SigninPage() {
  const t = await getTranslations('auth.signin');

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
            {t('cta.noAccount')}
            <Button variant='link' className='p-0'>
              <Link href='/sign-up'>{t('cta.signUpLink')}</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SigninPage;
