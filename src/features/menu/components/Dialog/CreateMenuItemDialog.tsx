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

function CreateMenuItemDialog({
  categories,
}: {
  categories: { name: string; icon_name: string | null }[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button onClick={() => setIsOpen(true)}>
        <Plus />
        Add New Item
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Menu Item</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new menu item
          </DialogDescription>

          <CreateMenuItemForm
            onClose={() => setIsOpen(false)}
            categories={categories}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateMenuItemDialog;
