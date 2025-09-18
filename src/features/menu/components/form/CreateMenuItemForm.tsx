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
import UploadImage from '@/components/shared/UploadImage';
import { Small } from '@/components/typography/Small';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { createMenuItem } from '@/supabase/data/menu-service';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  createMenuItemSchema,
  CreateMenuItemSchema,
} from '../../schema/schema';
import CategorySelect from '../selects/CategorySelect';
import IngredientsList from '../selects/IngredientsList';
import CreateIngredientsForm from './CreateIngredientsForm';
import { useState } from 'react';

function CreateMenuItemForm({ onClose }: { onClose: () => void }) {
  const form = useForm<CreateMenuItemSchema>({
    resolver: zodResolver(createMenuItemSchema),
    defaultValues: {
      name: '',
      price: 0,
      image: undefined,
      ingredients: [],
      category: { name: undefined, icon_name: undefined },
    },
  });
  const isLoading = form.formState.isSubmitting;

  const [charLength, setCharLength] = useState<number>(0);

  async function onSubmit(values: CreateMenuItemSchema) {
    const { success, error } = await createMenuItem({
      ...values,
      category: values?.category?.name,
    });

    onClose();

    if (success) toast.success('Successgully Created');
    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 md:space-y-6'
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel className='text-xs md:text-sm'>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter menu item name'
                  className='text-xs md:text-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-x-1 gap-y-4 sm:flex-row sm:items-start sm:justify-between md:gap-x-2 md:gap-y-6'>
          <FormField
            name='price'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel className='text-xs md:text-sm'>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder='0.00'
                    inputMode='numeric'
                    type='number'
                    step={0.01}
                    min={1}
                    max={10_000_000}
                    className='text-xs md:text-sm'
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
                <FormLabel className='text-xs md:text-sm'>Category</FormLabel>
                <FormControl>
                  <CategorySelect {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Accordion type='single' collapsible className='!my-1 w-full md:!my-2'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-xs md:text-sm'>
              Additional Details
            </AccordionTrigger>
            <AccordionContent className='mx-0 my-0 space-y-4 md:mx-1 md:my-1 md:space-y-6'>
              <FormField
                name='ingredients'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='text-xs md:text-sm'>
                      Ingredients
                    </FormLabel>
                    <FormControl>
                      <div className='flex flex-col gap-2'>
                        <CreateIngredientsForm
                          onCreate={(value) => {
                            const ingExists = field.value?.find(
                              (ing) => ing.name === value.name,
                            );
                            if (!ingExists)
                              return field.onChange([
                                ...(field.value ?? []),
                                value,
                              ]);
                            else toast.warning('Ingredient already added');
                          }}
                        />

                        <IngredientsList {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='description'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='flex justify-between text-xs md:text-sm'>
                      Description
                      <Small>{charLength}/280</Small>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        maxLength={280}
                        className='max-h-28 text-xs md:text-sm'
                        autoComplete='on'
                        placeholder='Write a short description of the menu item'
                        {...field}
                        onChange={(e) => {
                          setCharLength(e.target.value.length);
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <FormField
          name='image'
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <UploadImage error={error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-center gap-1 md:gap-2'>
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
