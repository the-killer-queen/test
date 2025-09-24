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
import { useTranslations } from 'next-intl';

type DeleteCategoryDialogProps = {
  category: MenuCategoryRow;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function DeleteCategoryDialog({
  category,
  children,
}: DeleteCategoryDialogProps) {
  const t = useTranslations('menu');
  const { deleteCategoryItem, isPending } = useDeleteCategory();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    const { success, error } = await deleteCategoryItem({
      id: category.id,
      name: category.name,
    });
    if (success) toast.success(t('messages.success.categoryDeleted'));

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
          <DialogTitle>
            {t('dialog.deleteCategory.title', { name: category.name })}
          </DialogTitle>
          <DialogDescription>
            {t('dialog.deleteCategory.description')}
          </DialogDescription>
          <div className='flex items-center justify-center gap-2'>
            <Button
              disabled={isPending}
              variant={'secondary'}
              className='flex-1'
              onClick={() => setIsOpen(false)}
            >
              {t('dialog.deleteCategory.cancel')}
            </Button>
            <Button
              disabled={isPending}
              onClick={handleDelete}
              variant={'destructive'}
              className='flex-1'
            >
              {isPending ? <Spinner /> : <Trash2 />}
              {isPending
                ? t('dialog.deleteCategory.deleting')
                : t('dialog.deleteCategory.confirm')}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategoryDialog;
