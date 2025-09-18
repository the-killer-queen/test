'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MenuRow } from '@/types/tables';
import { cloneElement, ReactElement, useState } from 'react';
import UpdateMenuItemForm from '../form/UpdateMenuItemForm';

type EditMenuItemProps = {
  menuItem: MenuRow;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function UpdateMenuItemDialog({ menuItem, children }: EditMenuItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {cloneElement(children, {
          onClick: (e) => {
            e.preventDefault();
            setIsOpen(true);
          },
        })}
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] !w-full overflow-y-auto md:min-w-3xl'>
        <DialogHeader>
          <DialogTitle className='text-sm md:text-base'>
            Update Menu Item
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            Update the details of your menu item
          </DialogDescription>

          <UpdateMenuItemForm
            menuToUpdate={menuItem}
            onClose={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateMenuItemDialog;
