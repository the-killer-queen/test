'use client';

import { Button } from '@/components/ui/button';

import DynamicIcon from '@/components/shared/DynamicIcon';
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
import { icons } from '../../lib/constant';

function CategoriesIcons({ ...field }: ControllerRenderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='flex-1 justify-between'
        >
          <DynamicIcon iconName={field.value || ''} />
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent side={'bottom'} className='h-48 w-48 p-0 px-2'>
        <Command>
          <CommandInput placeholder='Search categories...' />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandList>
            <CommandGroup className='[&>*]:!grid [&>*]:!grid-cols-4 [&>*]:!gap-1'>
              {icons.map((icon, i) => {
                return (
                  <CommandItem
                    onSelect={() => {
                      setIsOpen(false);
                      field.onChange(icon);
                    }}
                    key={i}
                    value={icon}
                    className={`w-min justify-between border ${field.value === icon ? 'bg-accent opacity-100' : 'opacity-80'}`}
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

export default CategoriesIcons;
