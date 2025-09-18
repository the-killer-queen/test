'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, FileText, Printer, Settings, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import DeleteOrderDialog from '../dialog/DeleteOrderDialog';
import EditOrderDialog from '../dialog/EditOrderDialog';
import { OrderRow } from '@/types/tables';

type OrderQuickActionsCardProps = {
  order: OrderRow;
};

function OrderQuickActionsCard({ order }: OrderQuickActionsCardProps) {
  function handlePrintOrder() {
    toast.info('Print preview would open here', {
      description: 'This is a mock action for demonstration purposes',
    });
  }

  function handleCopyOrderId() {
    const orderIdentifier = order.order_name || order.id;
    if ('clipboard' in navigator)
      navigator.clipboard.writeText(orderIdentifier.toString()).then(() => {
        toast.success('Order ID copied to clipboard');
      });
  }

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Settings className='h-4 w-4' />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <EditOrderDialog order={order}>
          <Button variant='ghost' size='sm' className='w-full justify-start'>
            <FileText className='h-4 w-4' />
            Edit Order
          </Button>
        </EditOrderDialog>

        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          onClick={handlePrintOrder}
        >
          <Printer className='h-4 w-4' />
          Print Order
        </Button>

        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start'
          onClick={handleCopyOrderId}
        >
          <Copy className='h-4 w-4' />
          Copy Order ID
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
            Delete Order
          </Button>
        </DeleteOrderDialog>
      </CardContent>
    </Card>
  );
}

export default OrderQuickActionsCard;
