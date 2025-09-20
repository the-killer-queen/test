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
import { User } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { requestPasswordChange } from '../actions/changePassword';
import { changePasswordSchema, ChangePasswordSchema } from '../schema';
import { Send } from 'lucide-react';

type ChangePasswordFormProps = {
  user: User;
};

function ChangePasswordForm({ user }: ChangePasswordFormProps) {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: user.email || '',
    },
  });

  async function onSubmit(values: ChangePasswordSchema) {
    const { success, error } = await requestPasswordChange(values);

    if (success) {
      toast.success('Password reset link sent to your email!');
      form.reset();
    }

    if (!success) toast.error(error);
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
                  placeholder='Enter your email address'
                  type='email'
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <SubmitButton
            className='w-min'
            icon={<Send />}
            label='Send Password Reset Link'
            loadinglabel='Sending...'
            isLoading={form.formState.isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
}

export default ChangePasswordForm;
