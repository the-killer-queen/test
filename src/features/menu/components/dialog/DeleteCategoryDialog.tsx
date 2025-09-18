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
import { MenuCategoryRow } from '@/types/tables';
import { Trash2 } from 'lucide-react';
import { cloneElement, ReactElement, useState } from 'react';
import { toast } from 'sonner';
import { useDeleteCategory } from '../../hooks/useDeleteCategory';

type DeleteCategoryDialogProps = {
  category: MenuCategoryRow;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function DeleteCategoryDialog({
  category,
  children,
}: DeleteCategoryDialogProps) {
  const { deleteCategoryItem, isPending } = useDeleteCategory();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    const { success, error } = await deleteCategoryItem({
      id: category.id,
      name: category.name,
    });
    if (success) toast.success('Category Successfully Deleted');

    if (!success) toast.error(error);

    setIsOpen(false);
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
          <DialogTitle>Delete &quot;{category.name}&quot;?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The category will be removed from all
            menu items using it.
          </DialogDescription>
          <div className='flex items-center justify-center gap-2'>
            <Button
              disabled={isPending}
              variant={'secondary'}
              className='flex-1'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              onClick={handleDelete}
              variant={'destructive'}
              className='flex-1'
            >
              {isPending ? <Spinner /> : <Trash2 />}
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategoryDialog;
