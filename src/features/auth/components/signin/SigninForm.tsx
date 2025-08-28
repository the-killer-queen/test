'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type LoginFormSchema, loginSchema } from '@/features/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { login } from '../../actions/login';
import SigninCTA from './SigninCTA';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function SigninForm() {
  const router = useRouter();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    const { success, error } = await login(values);

    if (success) {
      toast.success('Welcome back! You have successfully signed in.');
      router.push('/');
    }

    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your email address'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your password'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className='text-muted-foreground flex items-center gap-1 text-sm'>
          <Button variant='link' className='p-0'>
            <Link href='/forgot-password'>Forgot your password?</Link>
          </Button>
        </p>

        <div>
          <SigninCTA pending={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
}

export default SigninForm;
