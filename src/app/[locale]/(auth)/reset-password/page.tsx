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

async function ResetPasswordPage() {
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
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a reset link to get back into
          your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
}

export default ResetPasswordPage;
