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
import { deleteCharge } from '@/supabase/data/charges-service';
import { Trash2 } from 'lucide-react';
import { cloneElement, ReactElement, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type DeleteChargeProps = {
  chargeId: number;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
  chargeName?: string;
};

function DeleteChargeDialog({
  chargeId,
  children,
  chargeName = 'this charge',
}: DeleteChargeProps) {
  const t = useTranslations('settings');
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    startTransition(async () => {
      const { success, error } = await deleteCharge(chargeId);

      if (success) toast.success(t('charges.messages.success.deleted'));
      if (!success) toast.error(error);

      setIsOpen(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {cloneElement(children, {
          onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(true);
          },
        })}
      </DialogTrigger>

      <DialogContent className='max-w-xs md:max-w-md'>
        <DialogHeader className='px-2 md:px-4'>
          <DialogTitle className='text-sm md:text-base'>
            {t('charges.dialog.delete.title', { name: chargeName })}
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            {t('charges.dialog.delete.description')}
          </DialogDescription>
          <div className='flex items-center justify-center gap-2 px-2 md:px-0'>
            <Button
              disabled={isLoading}
              variant={'secondary'}
              className='flex-1 text-xs md:text-sm'
              onClick={() => setIsOpen(false)}
            >
              {t('charges.dialog.delete.cancel')}
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              variant={'destructive'}
              className='flex-1 text-xs md:text-sm'
            >
              {isLoading ? <Spinner /> : <Trash2 />}
              {isLoading
                ? t('charges.dialog.delete.deleting')
                : t('charges.dialog.delete.confirm')}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteChargeDialog;
