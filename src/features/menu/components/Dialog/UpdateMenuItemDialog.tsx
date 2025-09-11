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

      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Update Menu Item</DialogTitle>
          <DialogDescription>
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
