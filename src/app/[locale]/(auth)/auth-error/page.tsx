import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { AlertTriangle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

async function AuthErrorPage({
  searchParams,
}: PageProps<'/[locale]/auth-error'>) {
  const { message } = (await searchParams) as { message: string };
  const t = await getTranslations('Auth.AuthError');

  const title =
    message && t.has(`errors.${message}.title`)
      ? t(`errors.${message}.title`)
      : t('errors.default.title');

  const description =
    message && t.has(`errors.${message}.description`)
      ? t(`errors.${message}.description`)
      : t('errors.default.description');

  return (
    <Card className='!border-destructive w-full max-w-sm border-2 text-center'>
      <CardHeader className='flex flex-col items-center space-y-2'>
        <AlertTriangle className='text-destructive h-10 w-10' />
        <CardTitle className='text-destructive text-xl font-bold'>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <p className='text-muted-foreground text-sm'>{description}</p>

        <Link href='/'>
          <Button variant='destructive' className='w-full'>
            {t('goBackButton')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default AuthErrorPage;
