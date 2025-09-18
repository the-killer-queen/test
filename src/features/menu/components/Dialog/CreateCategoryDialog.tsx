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
      <DialogContent className='!max-w-xs md:!max-w-sm'>
        <DialogHeader className='px-2 md:px-0'>
          <DialogTitle className='text-sm md:text-base'>
            Create Category
          </DialogTitle>
        </DialogHeader>
        <CreateCategoryForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
