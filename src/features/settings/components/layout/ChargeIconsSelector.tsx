'use client';

import DynamicIcon from '@/components/shared/DynamicIcon';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { icons } from '../../constant/constant';
import { useTranslations } from 'next-intl';

function ChargeIconsSelector({ ...field }: ControllerRenderProps) {
  const t = useTranslations('settings');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='h-10 justify-between'
        >
          <div className='flex items-center gap-2'>
            <DynamicIcon iconName={field.value || 'DollarSign'} />
            <span className='text-sm'>
              {field.value || t('charges.form.fields.iconPlaceholder')}
            </span>
          </div>
          <ChevronsUpDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' className='h-26 w-full p-0 px-1 md:h-48'>
        <Command>
          <CommandInput
            placeholder={t('charges.form.fields.iconSearchPlaceholder')}
            className='text-sm'
          />
          <CommandEmpty className='text-sm'>
            {t('charges.form.fields.noIconFound')}
          </CommandEmpty>
          <CommandList>
            <CommandGroup className='[&>*]:!grid [&>*]:!grid-cols-6 [&>*]:!gap-0.5 md:[&>*]:!gap-1'>
              {icons.map((icon, i) => {
                return (
                  <CommandItem
                    onSelect={() => {
                      setIsOpen(false);
                      field.onChange(icon);
                    }}
                    key={i}
                    value={icon}
                    className={`flex items-center justify-center border p-1 md:p-2 ${
                      field.value === icon
                        ? 'bg-accent opacity-100'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <DynamicIcon iconName={icon} />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ChargeIconsSelector;
