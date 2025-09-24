'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AdditionalChargesRow } from '@/types/tables';
import { cloneElement, ReactElement, useState } from 'react';
import EditChargeForm from '../form/EditChargeForm';
import { useTranslations } from 'next-intl';

type EditAdditionalChargeProps = {
  charge: AdditionalChargesRow;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function EditAdditionalChargeDialog({
  charge,
  children,
}: EditAdditionalChargeProps) {
  const t = useTranslations('settings');
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

      <DialogContent className='!max-w-xs md:!max-w-sm'>
        <DialogHeader className='px-2 md:px-0'>
          <DialogTitle className='text-sm md:text-base'>
            {t('charges.form.edit.title')}
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            {t('charges.form.edit.description')}
          </DialogDescription>

          <EditChargeForm
            chargeToEdit={charge}
            onClose={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditAdditionalChargeDialog;
