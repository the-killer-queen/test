import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LoginWithGoogleButton, SignupForm } from '@/features/auth';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // const t = await getTranslations();
  return {
    title: 'Sign up',
  };
}

async function SignupPage() {
  const t = await getTranslations('auth.signup');

  return (
    <div className='w-full max-w-sm'>
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>

          <LoginWithGoogleButton />

          <div className='grid grid-cols-7 items-center gap-3'>
            <Separator className='col-span-3' />
            <p className='!text-muted-foreground col-span-1 text-center text-sm'>
              {t('cta.orSeparator')}
            </p>
            <Separator className='col-span-3' />
          </div>
        </CardHeader>

        <CardContent>
          <SignupForm />

          <p className='!text-muted-foreground mt-4 flex items-center justify-center gap-1 text-sm'>
            {t('cta.haveAccount')}
            <Button variant='link' className='p-0'>
              <Link href='/sign-in'>{t('cta.signInLink')}</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupPage;
