'use client';

import Spinner from '@/components/shared/Spinner';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateCategory } from '../../hooks/useCreateCategory';
import {
  createCategorySchema,
  CreateCategorySchema,
} from '../../schema/schema';
import CategoriesIcons from '../selects/CategoriesIcons';
import { useTranslations } from 'next-intl';

function CreateCategoryForm({ onClose }: { onClose: () => void }) {
  const t = useTranslations('menu');
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      icon_name: null,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const { createCategoryItem } = useCreateCategory();

  async function onSubmit(values: CreateCategorySchema) {
    const { success, error } = await createCategoryItem(values);

    if (success)
      toast.success(t('messages.success.categoryCreated'), {
        className: 'opacity-100',
        duration: 1_500,
      });
    if (!success)
      toast.error(error, {
        className: 'opacity-100',
        duration: 2000,
      });

    setTimeout(() => onClose(), 2_100);
  }

  return (
    <Form {...form}>
      <div className='space-y-4 px-2 md:space-y-4 md:px-0'>
        <div className='flex items-start gap-1 md:gap-2'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel className='text-xs md:text-sm'>
                  {t('categories.form.name')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('categories.form.namePlaceholder')}
                    className='text-xs md:text-sm'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='icon_name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs md:text-sm'>
                  {t('categories.form.iconOptional')}
                </FormLabel>
                <FormControl>
                  <CategoriesIcons {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end gap-1 md:gap-2'>
          <Button
            onClick={onClose}
            disabled={isLoading}
            type='button'
            variant='outline'
          >
            {t('categories.create.cancel')}
          </Button>
          <Button disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
            {isLoading && <Spinner />}
            {isLoading
              ? t('categories.create.submitting')
              : t('categories.create.submit')}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default CreateCategoryForm;
