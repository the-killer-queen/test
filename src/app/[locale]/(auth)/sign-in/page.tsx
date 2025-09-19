'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SigninForm from '@/features/auth/components/signin/SigninForm';
import { Link } from '@/i18n/navigation';

function SigninPage() {
  return (
    <div className='w-full max-w-sm'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Sign in to continue tracking your habits and achieving your goals.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SigninForm />

          <p className='text-muted-foreground mt-4 flex items-center justify-center gap-1 text-sm'>
            Don&apos;t have an account?
            <Button variant='link' className='p-0'>
              <Link href='/sign-up'>Sign up</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SigninPage;
