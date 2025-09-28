import { Button } from '@/components/ui/button';
import { searchParamsCache } from '@/lib/utils';
import { getOrderById } from '@/supabase/data/orders-service';
import { AlertTriangle, Edit } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import EditOrderDialog from '../dialog/EditOrderDialog';

type UpdateOrderActionProps = {
  className?: string;
};

async function UpdateOrderAction({ className }: UpdateOrderActionProps) {
  const { orderId } = searchParamsCache.all();
  if (!orderId) return null;

  const { data: order, error } = await getOrderById(orderId);
  const t = await getTranslations('orders');

  if (!order || error) {
    return (
      <Button variant={'destructive'} size='sm' className={className} disabled>
        <AlertTriangle />
        <span>Error</span>
      </Button>
    );
  }

  return (
    <EditOrderDialog order={order}>
      <Button variant={'default'} size='sm' className={className}>
        <Edit />
        <span>{t('form.edit.title')}</span>
      </Button>
    </EditOrderDialog>
  );
}

export default UpdateOrderAction;
