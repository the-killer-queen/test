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
import { updateUserPasword } from '@/supabase/data/user-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { changePasswordSchema, ChangePasswordSchema } from '../schema';
import { useTranslations } from 'next-intl';

function ChangePasswordForm() {
  const t = useTranslations('profile');
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ChangePasswordSchema) {
    const { success, error } = await updateUserPasword(values.password);

    if (success) {
      toast.success(t('changePassword.success'));
      form.reset();
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
              <FormLabel>{t('changePassword.newPassword')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('changePassword.newPasswordPlaceholder')}
                  type='password'
                  {...field}
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
              <FormLabel>{t('changePassword.confirmPassword')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('changePassword.confirmPasswordPlaceholder')}
                  type='password'
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
            label={t('changePassword.submit')}
            loadinglabel={t('changePassword.submitting')}
            isLoading={form.formState.isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
}

export default ChangePasswordForm;
