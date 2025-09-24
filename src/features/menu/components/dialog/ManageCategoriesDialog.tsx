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
import { useTranslations } from 'next-intl';

function ManageCategoriesDialog() {
  const t = useTranslations('menu');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        className='[&_span]:hidden md:[&_span]:inline-block'
        variant='outline'
        onClick={() => setIsOpen(true)}
      >
        <Settings />
        <span>{t('ctaActions.manageCategories')}</span>
      </Button>

      <DialogContent className='max-h-[90vh] max-w-xs overflow-y-auto md:max-w-md'>
        <DialogHeader className='px-2 md:px-0'>
          <DialogTitle className='text-sm md:text-base'>
            {t('categories.manage.title')}
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            {t('categories.manage.description')}
          </DialogDescription>
        </DialogHeader>

        <ManageCategoriesContent />
      </DialogContent>
    </Dialog>
  );
}

export default ManageCategoriesDialog;
