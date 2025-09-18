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
import { deleteOrder } from '@/supabase/data/orders-service';
import { Trash2 } from 'lucide-react';
import { cloneElement, ReactElement, useState, useTransition } from 'react';
import { toast } from 'sonner';

type DeleteOrderProps = {
  orderId: string;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
  orderName?: string;
};

function DeleteOrderDialog({
  orderId,
  children,
  orderName = 'this order',
}: DeleteOrderProps) {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    startTransition(async () => {
      const { success, error } = await deleteOrder(orderId);

      if (success) toast.success('Order Successfully Deleted');
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
            Delete &quot;{orderName}&quot;?
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            This action cannot be undone. The selected order will be removed
            permanently.
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

export default DeleteOrderDialog;
