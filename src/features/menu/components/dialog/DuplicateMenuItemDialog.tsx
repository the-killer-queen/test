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
import { createMenuItemDuplicate } from '@/supabase/data/menu-service';
import { Copy } from 'lucide-react';
import { cloneElement, ReactElement, useState, useTransition } from 'react';
import { toast } from 'sonner';

type DuplicateMenuItemProps = {
  menuItemId: number;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
  itemName?: string;
};

function DuplicateMenuItemDialog({
  menuItemId,
  children,
  itemName = 'this item',
}: DuplicateMenuItemProps) {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDuplicate() {
    startTransition(async () => {
      const { success, error } = await createMenuItemDuplicate(menuItemId);

      if (success) toast.success(`${itemName} successfully duplicated`);

      if (!success) toast.error(error);

      setIsOpen(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {cloneElement(children, {
        onClick: (e) => {
          e.preventDefault();
          setIsOpen(true);
        },
      })}
      <DialogContent className='!max-w-xs'>
        <DialogHeader>
          <DialogTitle>Duplicate {itemName}?</DialogTitle>
          <DialogDescription>
            This will create a copy of the selected menu item with
            &quot;(Copy)&quot; added to the name. You can edit the duplicate
            after creation.
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
              onClick={handleDuplicate}
              variant={'default'}
              className='bg-warning/10 !text-warning [&_svg]:!text-warning hover:bg-warning/5 flex-1 cursor-pointer'
            >
              {isLoading ? <Spinner /> : <Copy />}
              {isLoading ? 'Duplicating...' : 'Duplicate'}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DuplicateMenuItemDialog;
