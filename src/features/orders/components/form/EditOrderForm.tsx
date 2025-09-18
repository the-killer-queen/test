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
import { OrderRow } from '@/types/tables';
import { zodResolver } from '@hookform/resolvers/zod';
import { SquarePen } from 'lucide-react';
import { useForm } from 'react-hook-form';

import Spinner from '@/components/shared/Spinner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { updateOrderSchema, UpdateOrderSchema } from '../../schema/schema';
import OrderTypeSelect from '../selects/OrderTypeSelect';
import OrderStatusSelect from '../selects/OrderStatusSelect';
import MenuItemsSelector from '../selects/MenuItemsSelector';
import { updateOrder } from '@/supabase/data/orders-service';

type EditOrderFormProps = {
  onClose: () => void;
  orderToEdit: OrderRow;
};

function EditOrderForm({ orderToEdit, onClose }: EditOrderFormProps) {
  const form = useForm<UpdateOrderSchema>({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: {
      order_name: orderToEdit?.order_name || '',
      customer_name: orderToEdit?.customer_name || '',
      customer_contact: orderToEdit?.customer_contact || '',
      is_togo: orderToEdit?.is_togo || false,
      status: orderToEdit?.status || 'unpaid',
      total_price: orderToEdit?.total_price || 0,
      notes: orderToEdit?.notes || '',
      items: orderToEdit?.items || [],
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: UpdateOrderSchema) {
    const { success, error } = await updateOrder(orderToEdit.id, {
      order_name: values.order_name && values.order_name.replaceAll(' ', '-'),
      ...values,
    });

    onClose();

    if (success) toast.success('Order Updated Successfully');
    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 md:space-y-6'
      >
        <div className='grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2'>
          <FormField
            name='is_togo'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs md:text-sm'>Order Type</FormLabel>
                <FormControl>
                  <OrderTypeSelect {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='status'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs md:text-sm'>Status</FormLabel>
                <FormControl>
                  <OrderStatusSelect {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name='items'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs md:text-sm'>Order Items</FormLabel>
              <FormControl>
                <MenuItemsSelector {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Accordion type='single' collapsible className='!my-1 w-full md:!my-2'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-xs md:text-sm'>
              Additional Details
            </AccordionTrigger>
            <AccordionContent className='mx-0 my-0 space-y-4 md:mx-1 md:my-1 md:space-y-6'>
              <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4'>
                <FormField
                  name='customer_name'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs md:text-sm'>
                        Customer Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter customer name'
                          className='text-xs md:text-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='customer_contact'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs md:text-sm'>
                        Contact Info
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Phone or email'
                          className='text-xs md:text-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name='order_name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs md:text-sm'>
                      Order Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Custom order name'
                        className='text-xs md:text-sm'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='notes'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs md:text-sm'>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        className='max-h-28 text-xs md:text-sm'
                        placeholder='Special instructions or notes'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className='flex items-center justify-center gap-1 md:gap-2'>
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
            {isLoading ? 'Updating...' : 'Update Order'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditOrderForm;
