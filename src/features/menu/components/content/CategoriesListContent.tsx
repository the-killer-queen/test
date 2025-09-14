'use client';

import DynamicIcon from '@/components/shared/DynamicIcon';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Trash2 } from 'lucide-react';
import { useGetMenuCategories } from '../../hooks/useGetMenuCategories';
import DeleteCategoryDialog from '../dialog/DeleteCategoryDialog';
import CategoriesListSkeleton from '../skeletons/CategoriesListSkeleton';

function CategoriesListContent() {
  const { categories, error, isPending } = useGetMenuCategories();

  if (isPending) return <CategoriesListSkeleton />;
  if (error || !categories)
    return <div className='text-destructive'>Error!!!!</div>;

  return (
    <Command>
      <CommandInput placeholder='Search categories...' />
      <CommandEmpty>No categories available</CommandEmpty>
      <CommandList>
        <CommandGroup>
          {categories.map((category) => {
            return (
              <CommandItem
                key={category.id}
                className='justify-between border-b'
              >
                <span className='flex gap-1'>
                  <DynamicIcon iconName={category.icon_name || ''} />
                  {category.name}
                </span>
                <DeleteCategoryDialog category={category}>
                  <button>
                    <Trash2 className='text-destructive' />
                  </button>
                </DeleteCategoryDialog>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default CategoriesListContent;
