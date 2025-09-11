'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cloneElement, ReactElement, useState } from 'react';
import CreateCategoryForm from '../form/CreateCategoryForm';

type CreateCategoryDialogProps = {
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function CreateCategoryDialog({ children }: CreateCategoryDialogProps) {
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

      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='!max-w-sm'>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <CreateCategoryForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
