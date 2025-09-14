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
import { Check, ChevronsUpDown, Inbox, Plus } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useGetMenuCategories } from '../../hooks/useGetMenuCategories';
import CreateCategoryDialog from '../dialog/CreateCategoryDialog';
import CategorySelectSkeleton from '../skeletons/CategorySelectSkeleton';

function CategorySelect({
  ...field
}: ControllerRenderProps & {
  'aria-invalid'?: boolean;
}) {
  const { isPending, categories, error } = useGetMenuCategories();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isPending) return <CategorySelectSkeleton />;
  if (!categories) return <CategorySelectSkeleton />;

  if (error) return <p>!!!!</p>;

  return (
    <div className='flex items-center gap-2'>
      <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-invalid={field?.['aria-invalid'] || false}
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
        <PopoverContent side='bottom' className='max-h-48 w-48 p-0'>
          <Command>
            <CommandInput placeholder='Search categories...' />
            <CommandEmpty className='flex justify-center'>
              <span className='text-muted-foreground flex items-center gap-2 px-2 py-1.5 text-sm font-medium'>
                <Inbox className='size-4' />
                No categories available
              </span>
            </CommandEmpty>
            <CommandList>
              <CommandGroup>
                {categories.map((category, i) => (
                  <CommandItem
                    key={i}
                    value={category.name}
                    className={'justify-between'}
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
