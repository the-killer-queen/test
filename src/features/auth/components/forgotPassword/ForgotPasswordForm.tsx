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
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../../actions/forgotPassword';
import { toast } from 'sonner';
import SubmitButton from '@/components/shared/SubmitButton';
import { ForgotPasswordFormSchema, forgotPasswordSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';

function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordFormSchema) {
    try {
      await forgotPassword(values.email);
      toast.success('Password reset link sent to your email!');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to send the reset link. Please try again later.';
      toast.error(message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your registered email'
                  type='email'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          label='Send Reset Link'
          loadinglabel='Sending...'
          isLoading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
