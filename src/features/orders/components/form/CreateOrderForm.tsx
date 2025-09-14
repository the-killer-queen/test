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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { createOrder } from '@/supabase/data/orders-service';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { createOrderSchema, CreateOrderSchema } from '../../schema/schema';
import MenuItemsSelector from '../selects/MenuItemsSelector';
import OrderStatusSelect from '../selects/OrderStatusSelect';
import OrderTypeSelect from '../selects/OrderTypeSelect';

function CreateOrderForm({ onClose }: { onClose: () => void }) {
  const form = useForm<CreateOrderSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      order_name: '',
      customer_name: '',
      customer_contact: '',
      is_togo: false,
      status: 'unpaid',
      total_price: 0,
      notes: '',
      items: [],
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: CreateOrderSchema) {
    const { success, error } = await createOrder(values);

    onClose();

    if (success) toast.success('Order Created Successfully');
    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            name='is_togo'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Type</FormLabel>
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
                <FormLabel>Status</FormLabel>
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
              <FormLabel>Order Items</FormLabel>
              <FormControl>
                <MenuItemsSelector {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Accordion type='single' collapsible className='!my-2 w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Additional Details</AccordionTrigger>
            <AccordionContent className='mx-1 my-1 space-y-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  name='customer_name'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter customer name' {...field} />
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
                      <FormLabel>Contact Info</FormLabel>
                      <FormControl>
                        <Input placeholder='Phone or email' {...field} />
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
                    <FormLabel>Order Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Custom order name' {...field} />
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
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        className='max-h-28'
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

        <div className='flex items-center justify-center gap-2'>
          <Button disabled={isLoading} variant={'secondary'} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={'default'} disabled={isLoading} className='flex-1'>
            {isLoading ? <Spinner /> : <Plus />}
            {isLoading ? 'Creating...' : 'Create Order'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateOrderForm;
