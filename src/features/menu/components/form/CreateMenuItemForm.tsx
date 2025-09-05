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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Spinner from '@/components/shared/Spinner';
import { createMenuItem } from '@/supabase/data/menu-service';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  createMenuItemSchema,
  CreateMenuItemSchema,
} from '../../schema/schema';
import CategorySelect from '../CategorySelect';
import UploadMenuItemImage from '../UploadMenuItemImage';

function CreateMenuItemForm({
  onClose,
  categories,
}: {
  onClose: () => void;
  categories: { name: string; icon_name: string | null }[];
}) {
  const form = useForm<CreateMenuItemSchema>({
    resolver: zodResolver(createMenuItemSchema),
    defaultValues: {
      name: '',
      price: 0,
      image: undefined,
      ingredients: [],
      category: { name: '', icon_name: '' },
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: CreateMenuItemSchema) {
    const { success, error } = await createMenuItem({
      ...values,
      category: values.category.name,
    });

    onClose();

    if (success) toast.success('Successgully Created');
    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter menu item name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-start justify-between gap-2'>
          <FormField
            name='price'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder='0.00'
                    inputMode='numeric'
                    type='number'
                    step={1}
                    min={0}
                    max={10_000_000}
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='category'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Category (Optional)</FormLabel>
                <FormControl>
                  <CategorySelect categories={categories} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name='ingredients'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full flex-1'>
              <FormLabel>Ingredients (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter ingredients (comma separated)'
                  // Note: You'll need to handle ingredients parsing logic
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='image'
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <UploadMenuItemImage error={error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-center gap-2'>
          <Button disabled={isLoading} variant={'secondary'} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={'default'} disabled={isLoading} className='flex-1'>
            {isLoading ? <Spinner /> : <Plus />}
            {isLoading ? 'Creating...' : 'Create Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateMenuItemForm;
