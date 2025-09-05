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
import { toast } from 'sonner';
import {
  updateMenuItemSchema,
  UpdateMenuItemSchema,
} from '../../schema/schema';

type MenuItemUpdateFormProps = {
  onClose: () => void;
  menuToUpdate: MenuRow;
};

function EditMenuItemForm({ menuToUpdate, onClose }: MenuItemUpdateFormProps) {
  const form = useForm<UpdateMenuItemSchema>({
    resolver: zodResolver(updateMenuItemSchema),
    defaultValues: {
      name: menuToUpdate?.name || '',
      price: menuToUpdate?.price || 0,
      image_url: menuToUpdate?.image_url || '',
      ingredients: menuToUpdate?.ingredients || [],
      category: menuToUpdate?.category || '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function handleSubmit(values: UpdateMenuItemSchema) {
    const { success, error } = await updateMenuItem(values, menuToUpdate.id);

    if (success) toast.success('Updated Successfully');
    if (!success) toast.error(error);

    onClose();
  }

  return (
    <Form {...form}>
      <div className='space-y-4'>
        <div className='flex gap-2'>
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

          <FormField
            name='price'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-32'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder='0.00'
                    type='number'
                    step='0.01'
                    min='0'
                    max='999.99'
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
        </div>

        <div className='flex gap-2'>
          <FormField
            name='ingredients'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full flex-1'>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={
                      field?.value &&
                      field?.value.map((ing) => ing.name).join(', ')
                    }
                    placeholder='Enter ingredients (comma separated)'
                    // {...field}
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
              <FormItem className='w-32'>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input
                    // defaultValue={field.value.name}
                    placeholder='Enter tag (e.g., vegetarian, spicy)'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name='image_url'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder='https://example.com/image.jpg'
                  type='url'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-center gap-2'>
          <Button
            variant={'secondary'}
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isLoading}
            className='!bg-info/15 !text-info [&_svg]:!text-info hover:!bg-info/10 flex-1'
          >
            {isLoading ? <Spinner /> : <SquarePen />}
            {isLoading ? 'Updating...' : 'Update Item'}
          </Button>
          <Button
            disabled={isLoading}
            variant={'secondary'}
            className='flex-1'
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default EditMenuItemForm;
