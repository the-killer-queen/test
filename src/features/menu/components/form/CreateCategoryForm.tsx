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

function CreateCategoryForm({ onClose }: { onClose: () => void }) {
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
      toast.success('Successgully Created', {
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
      <div className='space-y-4'>
        <div className='flex items-start gap-2'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Category name' {...field} />
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
                <FormLabel>(Optional)</FormLabel>
                <FormControl>
                  <CategoriesIcons {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end gap-2'>
          <Button
            onClick={onClose}
            disabled={isLoading}
            type='button'
            variant='outline'
          >
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
            {isLoading && <Spinner />}
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default CreateCategoryForm;
