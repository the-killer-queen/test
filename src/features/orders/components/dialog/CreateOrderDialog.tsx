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
import { parseAsString, useQueryStates } from 'nuqs';
import { useTranslations } from 'next-intl';

function CreateOrderDialog() {
  const t = useTranslations('orders');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setParam] = useQueryStates({
    menu_item_filter: parseAsString,
    menu_item_query: parseAsString,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setParam(null);
        setIsOpen(false);
      }}
    >
      <Button
        onClick={() => setIsOpen(true)}
        className='[&_span]:hidden sm:[&_span]:inline-block'
      >
        <Plus />
        <span>{t('actions.newOrder')}</span>
      </Button>

      <DialogContent className='max-h-[90vh] !w-full overflow-y-auto md:min-w-3xl'>
        <DialogHeader>
          <DialogTitle>{t('form.create.title')}</DialogTitle>
          <DialogDescription>{t('form.create.description')}</DialogDescription>

          <CreateOrderForm onClose={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateOrderDialog;
