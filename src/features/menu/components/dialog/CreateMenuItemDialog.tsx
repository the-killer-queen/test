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
import CreateMenuItemForm from '../form/CreateMenuItemForm';
import { useTranslations } from 'next-intl';

function CreateMenuItemDialog() {
  const t = useTranslations('menu');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button
        onClick={() => setIsOpen(true)}
        className='[&_span]:hidden sm:[&_span]:inline-block'
      >
        <Plus />
        <span>{t('ctaActions.addNewItem')}</span>
      </Button>

      <DialogContent className='max-h-[90vh] !w-full overflow-y-auto md:min-w-3xl'>
        <DialogHeader className='px-2 md:px-0'>
          <DialogTitle className='text-sm md:text-base'>
            {t('form.create.title')}
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            {t('form.create.description')}
          </DialogDescription>

          <CreateMenuItemForm onClose={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateMenuItemDialog;
