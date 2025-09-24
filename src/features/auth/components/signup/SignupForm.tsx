'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { signup } from '../../actions/signup';
import { type SignupFormSchema, signupSchema } from '../../schema';
import { useTranslations } from 'next-intl';

function SignupForm() {
  const t = useTranslations('auth.signup');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: SignupFormSchema) {
    startTransition(async () => {
      const { success, error } = await signup(values);

      if (success) {
        toast.success(t('success'));
        router.push('/');
      }
      if (!success) toast.error(error);
    });
  }

  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.emailPlaceholder')}
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
              <FormLabel>{t('form.passwordLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.passwordPlaceholder')}
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
              <FormLabel>{t('form.confirmPasswordLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.confirmPasswordPlaceholder')}
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='pt-2'>
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? t('form.submitButtonLoading') : t('form.submitButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignupForm;
