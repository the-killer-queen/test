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
import { Small } from '@/components/typography/Small';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Check, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  createAdditionalChargeSchema,
  CreateAdditionalChargeSchema,
} from '../../schema/schema';
import { useState } from 'react';
import { updateCharge } from '@/supabase/data/charges-service';
import { Label } from '@/components/ui/label';
import ChargeIconsSelector from '../layout/ChargeIconsSelector';
import { AdditionalChargesRow } from '@/types/tables';

type EditChargeFormProps = {
  chargeToEdit: AdditionalChargesRow;
  onClose: () => void;
};

function EditChargeForm({ chargeToEdit, onClose }: EditChargeFormProps) {
  const form = useForm<CreateAdditionalChargeSchema>({
    resolver: zodResolver(createAdditionalChargeSchema),
    defaultValues: {
      name: chargeToEdit.name,
      amount: chargeToEdit.amount,
      description: chargeToEdit.description || '',
      icon_name: chargeToEdit.icon_name || '',
      is_active: chargeToEdit.is_active,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const [charLength, setCharLength] = useState<number>(
    (chargeToEdit.description || '').length,
  );

  async function onSubmit(values: CreateAdditionalChargeSchema) {
    const { success, error } = await updateCharge(chargeToEdit.id, values);

    onClose();

    if (success) toast.success('Additional charge updated successfully');
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
                  placeholder='Enter charge name (e.g., Service Fee, Tax)'
                  className='text-xs md:text-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-3 items-start gap-2'>
          <FormField
            name='amount'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel className='text-xs md:text-sm'>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder='0.00'
                    inputMode='numeric'
                    type='number'
                    step={0.01}
                    min={0.01}
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
            name='is_active'
            control={form.control}
            render={({ field }) => (
              <FormItem className='space-y-2 justify-self-end'>
                <FormLabel className='text-xs md:text-sm'>Status</FormLabel>
                <FormControl>
                  <div className='flex w-24 items-center space-x-2'>
                    <Switch
                      id='is-active'
                      checkedIcon={<Check width={12} height={12} />}
                      uncheckedIcon={<X width={12} height={12} />}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor='is-active'>
                      {field.value ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
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
                name='icon_name'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='text-xs md:text-sm'>Icon</FormLabel>
                    <FormControl>
                      <ChargeIconsSelector {...field} />
                    </FormControl>
                    <p className='text-muted-foreground text-xs'>
                      Choose an icon to represent this charge
                    </p>
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
                        placeholder='Write a short description of this additional charge'
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

        <div className='flex items-center justify-center gap-1 md:gap-2'>
          <Button disabled={isLoading} variant={'secondary'} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={'default'} disabled={isLoading} className='flex-1'>
            {isLoading ? <Spinner /> : <Save />}
            {isLoading ? 'Updating...' : 'Update Charge'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditChargeForm;
