'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cloneElement, ReactElement, useState } from 'react';
import CreateAdditionalChargeForm from '../form/CreateChargeForm';
import { useTranslations } from 'next-intl';

type CreateChargeDialogProps = {
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function CreateChargeDialog({ children }: CreateChargeDialogProps) {
  const t = useTranslations('settings');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {cloneElement(children, { onClick: () => setIsOpen(true) })}

      <DialogContent className='!max-w-xs md:!max-w-sm'>
        <DialogHeader className='px-2 md:px-0'>
          <DialogTitle className='text-sm md:text-base'>
            {t('charges.form.create.title')}
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            {t('charges.form.create.description')}
          </DialogDescription>

          <CreateAdditionalChargeForm onClose={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChargeDialog;
