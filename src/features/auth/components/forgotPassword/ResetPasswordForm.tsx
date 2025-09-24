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
import { useTranslations } from 'next-intl';

function ResetPasswordForm() {
  const t = useTranslations('auth.resetPassword');
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
      toast.success(t('success'));
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
              <FormLabel>{t('form.passwordLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('form.passwordPlaceholder')}
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
              <FormLabel>{t('form.confirmPasswordLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('form.confirmPasswordPlaceholder')}
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          label={t('form.submitButton')}
          loadinglabel={t('form.submitButtonLoading')}
          isLoading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
