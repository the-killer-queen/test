'use client';

import SubmitButton from '@/components/shared/SubmitButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ResetPasswordFormSchema, resetPasswordSchema } from '../../schema';

import { useRouter } from '@/i18n/navigation';
import { oneTimeResetPassword } from '../../actions/forgotPassword';

function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ResetPasswordFormSchema) {
    const { success, error } = await oneTimeResetPassword(values.password);

    if (success) {
      toast.success('Your password has been reset successfully!');
      router.push('/sign-in');
    }

    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          name='password'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your new password'
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='confirmPassword'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Re-enter your new password'
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          label='Reset Password'
          loadinglabel='Resetting...'
          isLoading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
