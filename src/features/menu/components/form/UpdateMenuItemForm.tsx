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
import { MenuRow } from '@/types/tables';
import { zodResolver } from '@hookform/resolvers/zod';
import { SquarePen } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { updateMenuItem } from '@/supabase/data/menu-service';
import Spinner from '@/components/shared/Spinner';
import UploadImage from '@/components/shared/UploadImage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import {
  updateMenuItemSchema,
  UpdateMenuItemSchema,
} from '../../schema/schema';
import IngredientsList from '../selects/IngredientsList';
import CreateIngredientsForm from './CreateIngredientsForm';
import CategorySelect from '../selects/CategorySelect';
import { Small } from '@/components/typography/Small';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type MenuItemUpdateFormProps = {
  onClose: () => void;
  menuToUpdate: MenuRow;
};

function UpdateMenuItemForm({
  menuToUpdate,
  onClose,
}: MenuItemUpdateFormProps) {
  const form = useForm<UpdateMenuItemSchema>({
    resolver: zodResolver(updateMenuItemSchema),
    defaultValues: {
      name: menuToUpdate?.name || '',
      price: menuToUpdate?.price || 0,
      image: undefined,
      ingredients: menuToUpdate?.ingredients || [],
      description: menuToUpdate?.description || '',
      category: menuToUpdate?.menu_categories
        ? {
            name: menuToUpdate.menu_categories.name,
            icon_name: menuToUpdate.menu_categories.icon_name,
          }
        : {
            icon_name: undefined,
            name: undefined,
          },
    },
  });
  const isLoading = form.formState.isSubmitting;

  const [charLength, setCharLength] = useState<number>(0);

  async function onSubmit(values: UpdateMenuItemSchema) {
    const { success, error } = await updateMenuItem(
      {
        ...values,
        image_url: menuToUpdate.image_url,
        category: values?.category?.name,
      },
      menuToUpdate.id,
    );

    onClose();

    if (success) toast.success('Updated Successfully');
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
                    step={0.01}
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
                  <CategorySelect {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Accordion
          type='single'
          collapsible
          value='item-1'
          className='!my-2 w-full'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger>Additional Details</AccordionTrigger>
            <AccordionContent className='mx-1 my-1 space-y-6'>
              <FormField
                name='ingredients'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Ingredients</FormLabel>
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
                    <FormLabel className='flex justify-between'>
                      Description
                      <Small>{charLength}/280</Small>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        maxLength={280}
                        className='max-h-28'
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
                <UploadImage
                  error={error}
                  {...field}
                  defaultImageURL={menuToUpdate?.image_url}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-center gap-2'>
          <Button
            type='button'
            disabled={isLoading}
            variant={'secondary'}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant={'default'}
            disabled={isLoading}
            className='!bg-info/15 !text-info [&_svg]:!text-info hover:!bg-info/10 flex-1'
          >
            {isLoading ? <Spinner /> : <SquarePen />}
            {isLoading ? 'Updating...' : 'Update Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateMenuItemForm;
