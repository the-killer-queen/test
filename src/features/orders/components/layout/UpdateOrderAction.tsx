import { Button } from '@/components/ui/button';
import { getOrderById } from '@/supabase/data/orders-service';
import { VariantProps } from 'class-variance-authority';
import { Edit, AlertTriangle } from 'lucide-react';
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
        <span>Edit Order</span>
      </Button>
    </EditOrderDialog>
  );
}

export default UpdateOrderAction;
