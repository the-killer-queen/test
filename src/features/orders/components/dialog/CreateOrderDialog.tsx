'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateOrderForm from '../form/CreateOrderForm';

function CreateOrderDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button
        onClick={() => setIsOpen(true)}
        className='[&_span]:hidden sm:[&_span]:inline-block'
      >
        <Plus />
        <span>New Order</span>
      </Button>

      <DialogContent className='max-h-[90vh] !w-full min-w-4xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Add menu items and customer details to create a new order
          </DialogDescription>

          <CreateOrderForm onClose={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateOrderDialog;
