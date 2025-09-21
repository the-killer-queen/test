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
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    startTransition(async () => {
      const { success, error } = await deleteCharge(chargeId);

      if (success) toast.success('Charge Successfully Deleted');
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
            Delete &quot;{chargeName}&quot;?
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            This action cannot be undone. The selected additional charge will be
            removed permanently from your system.
          </DialogDescription>
          <div className='flex items-center justify-center gap-2 px-2 md:px-0'>
            <Button
              disabled={isLoading}
              variant={'secondary'}
              className='flex-1 text-xs md:text-sm'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              variant={'destructive'}
              className='flex-1 text-xs md:text-sm'
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

export default DeleteChargeDialog;
