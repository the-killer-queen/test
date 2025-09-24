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
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('menu');
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDuplicate() {
    startTransition(async () => {
      const { success, error } = await createMenuItemDuplicate(menuItemId);

      if (success)
        toast.success(t('messages.success.duplicated', { name: itemName }));

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
          <DialogTitle>
            {t('dialog.duplicate.title', { name: itemName })}
          </DialogTitle>
          <DialogDescription>
            {t('dialog.duplicate.description')}
          </DialogDescription>
          <div className='flex items-center justify-center gap-2'>
            <Button
              disabled={isLoading}
              variant={'secondary'}
              className='flex-1'
              onClick={() => setIsOpen(false)}
            >
              {t('dialog.duplicate.cancel')}
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleDuplicate}
              variant={'default'}
              className='bg-warning/10 !text-warning [&_svg]:!text-warning hover:bg-warning/5 flex-1 cursor-pointer'
            >
              {isLoading ? <Spinner /> : <Copy />}
              {isLoading
                ? t('dialog.duplicate.duplicating')
                : t('dialog.duplicate.confirm')}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DuplicateMenuItemDialog;
