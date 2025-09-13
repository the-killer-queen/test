'use client';

import Spinner from '@/components/shared/Spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { removeItemFromStorage } from '@/supabase/data/global-service';
import { deleteMenuItem } from '@/supabase/data/menu-service';
import { Trash2 } from 'lucide-react';
import { cloneElement, ReactElement, useState, useTransition } from 'react';
import { toast } from 'sonner';

type DeleteMenuItemProps = {
  menuItemId: number;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
  itemName?: string;
  redirectBack?: boolean;
};

function DeleteMenuItemDialog({
  menuItemId,
  children,
  itemName = 'this item',
  redirectBack = false,
}: DeleteMenuItemProps) {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    startTransition(async () => {
      const { data, success, error } = await deleteMenuItem(menuItemId);

      if (success) {
        if (data.image_url) {
          const imagePath = data.image_url.split('/').at(-1);
          const { error: removeError } = await removeItemFromStorage(
            imagePath!,
            'menu_items_pictures',
          );

          if (removeError) toast.warning(removeError);
        }

        toast.success('Menu Item Successfully Deleted');
      }
      if (!success) toast.error(error);

      setIsOpen(false);
      if (redirectBack) window.location.href = '/dashboard/menu';
    });
  }

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

      <DialogContent className='!max-w-xs'>
        <DialogHeader>
          <DialogTitle>Delete {itemName} from menu?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The selected menu item will be
            removed.
          </DialogDescription>
          <div className='flex items-center justify-center gap-2'>
            <Button
              disabled={isLoading}
              variant={'secondary'}
              className='flex-1'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              variant={'destructive'}
              className='flex-1'
            >
              {isLoading ? <Spinner /> : <Trash2 />}
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteMenuItemDialog;
