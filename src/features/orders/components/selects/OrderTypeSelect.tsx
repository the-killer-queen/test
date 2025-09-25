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
import { Check, ChevronsUpDown, MapPin, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useTranslations } from 'next-intl';

function OrderTypeSelect({ ...field }: ControllerRenderProps) {
  const t = useTranslations('orders');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const orderTypes = [
    { value: false, label: t('type.dinein'), icon: MapPin },
    { value: true, label: t('type.togo'), icon: ShoppingBag },
  ];

  const selectedType = orderTypes.find((type) => type.value === field.value);

  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='flex-1 justify-between'
        >
          {selectedType ? (
            <span className='flex items-center gap-2'>
              <selectedType.icon className='h-4 w-4' />
              {selectedType.label}
            </span>
          ) : (
            t('form.fields.orderTypePlaceholder')
          )}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' className='w-48 p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {orderTypes.map((type) => (
                <CommandItem
                  key={type.label}
                  value={type.label}
                  className='justify-between'
                  onSelect={() => {
                    setIsOpen(false);
                    field.onChange(type.value);
                  }}
                >
                  <span className='flex items-center gap-2'>
                    <type.icon className='h-4 w-4' />
                    {type.label}
                  </span>
                  {field.value === type.value && <Check />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default OrderTypeSelect;
