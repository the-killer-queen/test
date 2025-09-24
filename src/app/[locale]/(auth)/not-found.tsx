import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

async function AuthNotFound() {
  const t = await getTranslations('auth.errors.notFound');

  return (
    <div className='w-full max-w-sm'>
      <Card>
        <CardHeader className='text-center'>
          <div className='!bg-muted/50 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full'>
            <MagnifyingGlassIcon className='!text-muted-foreground h-6 w-6' />
          </div>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Button asChild className='w-full'>
            <Link href='/sign-in'>{t('signInButton')}</Link>
          </Button>
          <Button asChild variant='outline' className='w-full'>
            <Link href='/sign-up'>{t('signUpButton')}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthNotFound;
