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
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import CreateCategoryDialog from './Dialog/CreateCategoryDialog';

type CategorySelectProps = {
  categories: { name: string; icon_name: string | null }[];
} & ControllerRenderProps;

function CategorySelect({ categories, ...field }: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className='flex items-center gap-2'>
      <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            className='flex-1 justify-between'
          >
            {field.value.name ? (
              <span className='flex items-center gap-2'>
                <DynamicIcon iconName={field.value.icon_name || ''} />
                {field.value.name}
              </span>
            ) : (
              'Select category...'
            )}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent side='bottom' className='h-48 w-48 p-0'>
          <Command>
            <CommandInput placeholder='Search categories...' />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {categories.map((category, i) => (
                  <CommandItem
                    key={i}
                    value={category.name}
                    className={'justify-between border-b'}
                    onSelect={() => {
                      setIsOpen(false);
                      field.onChange(category);
                    }}
                  >
                    <span className='flex items-center gap-2'>
                      <DynamicIcon iconName={category.icon_name || ''} />
                      {category.name}
                    </span>

                    {field.value.name === category.name && <Check />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>

        <CreateCategoryDialog />
      </Popover>
    </div>
  );
}

export default CategorySelect;
