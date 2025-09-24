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
import { useTranslations } from 'next-intl';

function ForgotPasswordForm() {
  const t = useTranslations('auth.forgotPassword');
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordFormSchema) {
    const { success, error } = await forgotPassword(values.email);

    if (success) toast.success(t('success'));
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
              <FormLabel>{t('form.emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('form.emailPlaceholder')}
                  type='email'
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

export default ForgotPasswordForm;
