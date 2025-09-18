'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  menuIngredientSchema,
  MenuIngredientSchema,
} from '../../schema/schema';

type CreateIngredientsFormProps = {
  onCreate: (ing: MenuIngredientSchema) => void;
};

function CreateIngredientsForm({ onCreate }: CreateIngredientsFormProps) {
  const form = useForm<MenuIngredientSchema>({
    resolver: zodResolver(menuIngredientSchema),
    defaultValues: {
      name: '',
      quantity: '',
    },
  });

  function onSubmit(values: MenuIngredientSchema) {
    onCreate(values);
    form.reset();
    form.setFocus('quantity');
  }

  return (
    <Form {...form}>
      <div className='flex flex-col gap-x-1 gap-y-4 sm:flex-row sm:items-start sm:justify-between md:gap-x-2 md:gap-y-6'>
        <FormField
          name='quantity'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Ingredient quantity'
                  className='text-xs md:text-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <div className='flex items-center gap-1 md:gap-2'>
                  <Input
                    type='text'
                    placeholder='Ingredient name'
                    className='text-xs md:text-sm'
                    {...field}
                  />

                  <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <Plus />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}

export default CreateIngredientsForm;
