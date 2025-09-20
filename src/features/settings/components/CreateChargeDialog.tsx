'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, Plus, Settings, Wifi } from 'lucide-react';
import { cloneElement, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const createChargeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
  amount: z.number().min(0.01, 'Amount must be at least $0.01'),
  description: z.string().min(1, 'Description is required'),
  icon: z.enum(['Settings', 'Wifi', 'DollarSign']),
});

type CreateChargeSchema = z.infer<typeof createChargeSchema>;

type CreateChargeDialogProps = {
  children: ReactElement;
  onAdd: (charge: {
    name: string;
    amount: number;
    description: string;
    isEnabled: boolean;
    isCustom: boolean;
    icon: 'Settings' | 'Wifi' | 'DollarSign';
  }) => void;
};

const iconOptions = [
  { value: 'Settings', label: 'Service', icon: Settings },
  { value: 'Wifi', label: 'WiFi', icon: Wifi },
  { value: 'DollarSign', label: 'General', icon: DollarSign },
];

function CreateChargeDialog({ children, onAdd }: CreateChargeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateChargeSchema>({
    resolver: zodResolver(createChargeSchema),
    defaultValues: {
      name: '',
      amount: 0,
      description: '',
      icon: 'DollarSign',
    },
  });

  const onSubmit = (values: CreateChargeSchema) => {
    onAdd({
      ...values,
      isEnabled: true,
      isCustom: true,
    });
    toast.success('Custom charge added successfully');
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {cloneElement(children, {
          onClick: () => setIsOpen(true),
        })}
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Add Custom Charge</DialogTitle>
          <DialogDescription>
            Create a new additional charge for your services
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Name</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g., Service Fee' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='amount'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        min='0.01'
                        max='1000'
                        placeholder='0.00'
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name='icon'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an icon' />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => {
                          const IconComponent = option.icon;
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <span className='flex items-center gap-2'>
                                <IconComponent className='h-4 w-4' />
                                {option.label}
                              </span>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Brief description of this charge'
                      className='max-h-20'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-2 pt-2'>
              <Button
                type='button'
                variant='outline'
                className='flex-1'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='flex-1'
                disabled={form.formState.isSubmitting}
              >
                <Plus className='h-4 w-4' />
                Add Charge
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChargeDialog;