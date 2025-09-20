import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ForgotPasswordForm } from '@/features/auth';

function ForgotPasswordPage() {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}

export default ForgotPasswordPage;
