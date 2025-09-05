'use client';

import Spinner from '@/components/shared/Spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deleteMenuItem } from '@/supabase/data/menu-service';
import { Trash2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

type DeleteMenuItemProps = { menuItemId: number };

function DeleteMenuItem({ menuItemId }: DeleteMenuItemProps) {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    startTransition(async () => {
      const { success, error } = await deleteMenuItem(menuItemId);

      if (success) toast.success('Menu Item Successfully Deleted');
      if (!success) toast.error(error);

      setIsOpen(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem
        variant='destructive'
        className='hover:!bg-destructive/5'
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <Trash2 />
        Delete
      </DropdownMenuItem>
      <DialogContent className='!max-w-xs'>
        <DialogHeader>
          <DialogTitle>Delete this menu item?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The selected menu item will be
            removed.
          </DialogDescription>
          <div className='flex items-center justify-center gap-2'>
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              variant={'destructive'}
              className='flex-1'
            >
              {isLoading ? <Spinner /> : <Trash2 />}
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
            <Button
              disabled={isLoading}
              variant={'secondary'}
              className='flex-1'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteMenuItem;
