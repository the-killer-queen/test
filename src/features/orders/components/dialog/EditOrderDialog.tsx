'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { OrderRow } from '@/types/tables';
import { cloneElement, ReactElement, useState } from 'react';
import EditOrderForm from '../form/EditOrderForm';

type EditOrderProps = {
  order: OrderRow;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function EditOrderDialog({ order, children }: EditOrderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

      <DialogContent className='max-h-[90vh] !w-full overflow-y-auto md:min-w-3xl lg:md:min-w-4xl xl:min-w-6xl'>
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>Update order details and items</DialogDescription>

          <EditOrderForm orderToEdit={order} onClose={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditOrderDialog;
