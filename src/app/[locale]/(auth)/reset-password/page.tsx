import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ResetPasswordForm } from '@/features/auth';
import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { createClient } from '@/supabase/server';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // const t = await getTranslations();
  return {
    title: 'Reset Password',
  };
}

async function ResetPasswordPage() {
  const t = await getTranslations('auth.resetPassword');

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return redirect({
      href: '/forgot-password',
      locale: routing.defaultLocale,
    });

  const isVerified = user.user_metadata.password_reset_verified;
  if (!isVerified)
    return redirect({
      href: '/forgot-password',
      locale: routing.defaultLocale,
    });

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>

      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
}

export default ResetPasswordPage;
