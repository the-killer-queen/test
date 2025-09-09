'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateMenuItemForm from '../form/CreateMenuItemForm';

function CreateMenuItemDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button onClick={() => setIsOpen(true)}>
        <Plus />
        Add New Item
      </Button>

      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create Menu Item</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new menu item
          </DialogDescription>

          <CreateMenuItemForm onClose={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateMenuItemDialog;
