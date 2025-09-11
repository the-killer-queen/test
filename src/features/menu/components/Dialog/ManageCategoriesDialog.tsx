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

      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
          <DialogDescription>
            Create, update, and delete menu categories to organize your items
          </DialogDescription>
        </DialogHeader>

        <ManageCategoriesContent />
      </DialogContent>
    </Dialog>
  );
}

export default ManageCategoriesDialog;
