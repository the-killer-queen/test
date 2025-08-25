import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ResetPasswordForm from '@/features/auth/components/forgotPassword/ResetPasswordForm';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/forgot-password');

  const isVerified = user.user_metadata.password_reset_verified;
  if (!isVerified) redirect('/forgot-password');

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
