'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, FileText, Printer, Settings, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import DeleteOrderDialog from '../dialog/DeleteOrderDialog';
import EditOrderDialog from '../dialog/EditOrderDialog';
import { OrderRow } from '@/types/tables';
import { handleCopyOrderId } from '../../lib/utils';
import { useTranslations } from 'next-intl';

type OrderQuickActionsCardProps = {
  order: OrderRow;
};

function OrderQuickActionsCard({ order }: OrderQuickActionsCardProps) {
  const t = useTranslations('orders');

  function handlePrintOrder() {
    toast.info(t('messages.info.printPreview'), {
      description: t('messages.info.printDescription'),
    });
  }

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Settings className='h-4 w-4' />
          {t('cards.quickActions.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <EditOrderDialog order={order}>
          <Button variant='ghost' size='sm' className='w-full justify-start'>
            <FileText className='h-4 w-4' />
            {t('cards.quickActions.editOrder')}
          </Button>
        </EditOrderDialog>

        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          onClick={handlePrintOrder}
        >
          <Printer className='h-4 w-4' />
          {t('cards.quickActions.printOrder')}
        </Button>

        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          onClick={(e) => handleCopyOrderId(e, order)}
        >
          <Copy className='h-4 w-4' />
          {t('cards.quickActions.copyOrderId')}
        </Button>

        <DeleteOrderDialog
          orderId={order.id}
          orderName={`#${order.order_name || order.id}`}
        >
          <Button
            variant='destructive'
            size='sm'
            className='w-full justify-start'
          >
            <Trash2 className='h-4 w-4' />
            {t('cards.quickActions.deleteOrder')}
          </Button>
        </DeleteOrderDialog>
      </CardContent>
    </Card>
  );
}

export default OrderQuickActionsCard;
