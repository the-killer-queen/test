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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { login } from '../../actions/login';
import SigninCTA from './SigninCTA';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@/i18n/navigation';
import { LoginFormSchema, loginSchema } from '../../schema';
import { useTranslations } from 'next-intl';

function SigninForm() {
  const t = useTranslations('auth.signin');
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
      toast.success(t('success'));
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

        <p className='text-muted-foreground flex items-center gap-1 text-sm'>
          <Button variant='link' className='p-0'>
            <Link href='/forgot-password'>{t('form.forgotPasswordLink')}</Link>
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
