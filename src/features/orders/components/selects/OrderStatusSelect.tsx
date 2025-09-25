'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, CreditCard, Clock } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useTranslations } from 'next-intl';

function OrderStatusSelect({ ...field }: ControllerRenderProps) {
  const t = useTranslations('orders');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const orderStatuses = [
    { value: 'paid', label: t('status.paid'), icon: CreditCard },
    { value: 'unpaid', label: t('status.unpaid'), icon: Clock },
  ];

  const selectedStatus = orderStatuses.find(
    (status) => status.value === field.value,
  );

  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='flex-1 justify-between'
        >
          {selectedStatus ? (
            <span className='flex items-center gap-2'>
              <selectedStatus.icon className='h-4 w-4' />
              {selectedStatus.label}
            </span>
          ) : (
            t('form.fields.statusPlaceholder')
          )}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' className='w-48 p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {orderStatuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  className='justify-between'
                  onSelect={() => {
                    setIsOpen(false);
                    field.onChange(status.value);
                  }}
                >
                  <span className='flex items-center gap-2'>
                    <status.icon className='h-4 w-4' />
                    {status.label}
                  </span>
                  {field.value === status.value && <Check />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default OrderStatusSelect;
