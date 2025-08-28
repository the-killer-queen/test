import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LoginWithGoogleButton from '@/features/auth/components/shared/LoginWithGoogleButton';

import SignupForm from '@/features/auth/components/signup/SignupForm';
import Link from 'next/link';

function SignupPage() {
  return (
    <div className='w-full max-w-sm'>
      <Card>
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Join us today and start building better habits for a healthier, more
            productive you.
          </CardDescription>

          <div className='my-4 flex gap-3'>
            <LoginWithGoogleButton />
          </div>

          <div className='grid grid-cols-7 items-center gap-3'>
            <Separator className='col-span-3' />
            <p className='!text-muted-foreground col-span-1 text-center text-sm'>
              OR
            </p>
            <Separator className='col-span-3' />
          </div>
        </CardHeader>

        <CardContent>
          <SignupForm />

          <p className='!text-muted-foreground mt-4 flex items-center justify-center gap-1 text-sm'>
            Already have an account?
            <Button variant='link' className='p-0'>
              <Link href='/sign-in'>Sign in</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupPage;
