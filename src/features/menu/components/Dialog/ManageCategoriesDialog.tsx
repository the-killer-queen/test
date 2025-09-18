'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import ManageCategoriesContent from '../content/ManageCategoriesContent';

function ManageCategoriesDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        className='[&_span]:hidden md:[&_span]:inline-block'
        variant='outline'
        onClick={() => setIsOpen(true)}
      >
        <Settings />
        <span>Manage Categories</span>
      </Button>

      <DialogContent className='max-h-[90vh] max-w-xs overflow-y-auto md:max-w-md'>
        <DialogHeader className='px-2 md:px-0'>
          <DialogTitle className='text-sm md:text-base'>
            Manage Categories
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            Create, update, and delete menu categories to organize your items
          </DialogDescription>
        </DialogHeader>

        <ManageCategoriesContent />
      </DialogContent>
    </Dialog>
  );
}

export default ManageCategoriesDialog;
