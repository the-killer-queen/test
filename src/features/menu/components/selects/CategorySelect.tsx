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

import ErrorState from '@/components/shared/ErrorState';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, Inbox, Plus } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useGetMenuCategories } from '../../../../hooks/useGetMenuCategories';
import CreateCategoryDialog from '../dialog/CreateCategoryDialog';
import CategorySelectSkeleton from '../skeletons/CategorySelectSkeleton';

function CategorySelect({
  ...field
}: ControllerRenderProps & {
  'aria-invalid'?: boolean;
}) {
  const { isPending, categories, error } = useGetMenuCategories();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (error) return <ErrorState message='Failed to load categories' />;

  if (isPending || !categories) return <CategorySelectSkeleton />;

  return (
    <div className='flex items-center gap-1 md:gap-2'>
      <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-invalid={field?.['aria-invalid'] || false}
            variant='outline'
            role='combobox'
            className='flex-1 justify-between text-xs md:text-sm'
          >
            {field.value.name ? (
              <span className='flex items-center gap-1 md:gap-2'>
                <DynamicIcon iconName={field.value.icon_name || ''} />
                {field.value.name}
              </span>
            ) : (
              'Select category...'
            )}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side='bottom'
          className='h-20 max-h-32 w-32 p-0 sm:h-full md:max-h-48 md:w-48'
        >
          <Command>
            <CommandInput
              placeholder='Search categories...'
              className='text-xs md:text-sm'
            />
            <CommandEmpty className='flex justify-center'>
              <span className='text-muted-foreground flex items-center gap-1 px-2 py-1 text-xs font-medium md:gap-2 md:py-1.5 md:text-sm'>
                <Inbox className='size-3 md:size-4' />
                No categories available
              </span>
            </CommandEmpty>
            <CommandList>
              <CommandGroup>
                {categories.map((category, i) => (
                  <CommandItem
                    key={i}
                    value={category.name}
                    className={'justify-between text-xs md:text-sm'}
                    onSelect={() => {
                      setIsOpen(false);
                      field.onChange(category);
                    }}
                  >
                    <span className='flex items-center gap-1 md:gap-2'>
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

        <CreateCategoryDialog>
          <Button variant='outline' size='icon'>
            <Plus />
          </Button>
        </CreateCategoryDialog>
      </Popover>
    </div>
  );
}

export default CategorySelect;
