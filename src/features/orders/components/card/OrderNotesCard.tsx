import { P } from '@/components/typography/P';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOrderById } from '@/supabase/data/orders-service';
import { MessageSquare } from 'lucide-react';
import CardError from '../error/CardError';

async function OrderNotesCard({ orderId }: { orderId: string }) {
  const { data: order, error } = await getOrderById(orderId);

  if (error || !order)
    return <CardError message='Failed to load order notes' />;

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <MessageSquare className='h-4 w-4' />
          Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <P>
          {order.notes || 'No special notes or instructions for this order.'}
        </P>
      </CardContent>
    </Card>
  );
}

export default OrderNotesCard;
