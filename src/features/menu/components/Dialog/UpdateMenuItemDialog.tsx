'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { MenuRow } from '@/types/tables';
import EditMenuItemForm from '../form/EditMenuItemForm';

type EditMenuItemProps = { menuItem: MenuRow };

function UpdateMenuItem({ menuItem }: EditMenuItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem
        className='!text-info [&_svg]:!text-info hover:!bg-info/5'
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <SquarePen />
        Edit
      </DropdownMenuItem>

      <DialogContent className='!max-w-md'>
        <DialogHeader>
          <DialogTitle>Update Menu Item</DialogTitle>
          <DialogDescription>
            Update the details of your menu item
          </DialogDescription>

          <EditMenuItemForm
            menuToUpdate={menuItem}
            onClose={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateMenuItem;
