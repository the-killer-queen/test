import { Button } from '@/components/ui/button';
import { getOrderById } from '@/supabase/data/orders-service';
import { VariantProps } from 'class-variance-authority';
import { AlertTriangle, Edit } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import EditOrderDialog from '../dialog/EditOrderDialog';

type UpdateOrderActionProps = {
  orderId: string;
  className?: string;
  variant?: VariantProps<typeof Button>['variant'];
};

async function UpdateOrderAction({
  className,
  variant,
  orderId,
}: UpdateOrderActionProps) {
  const { data: order, error } = await getOrderById(orderId);
  const t = await getTranslations('orders');

  if (!order || error) {
    return (
      <Button variant={variant} size='sm' className={className} disabled>
        <AlertTriangle />
        <span>Error</span>
      </Button>
    );
  }

  return (
    <EditOrderDialog order={order}>
      <Button variant={variant} size='sm' className={className}>
        <Edit />
        <span>{t('form.edit.title')}</span>
      </Button>
    </EditOrderDialog>
  );
}

export default UpdateOrderAction;
