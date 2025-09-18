import ErrorState from '@/components/shared/ErrorState';
import { P } from '@/components/typography/P';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOrderById } from '@/supabase/data/orders-service';
import { MessageSquare } from 'lucide-react';

async function OrderNotesCard({ orderId }: { orderId: string }) {
  const { data: order, error } = await getOrderById(orderId);

  if (error || !order)
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-8'>
          <ErrorState
            message='Failed to load order notes'
            iconClassName='h-8 w-8'
          />
        </CardContent>
      </Card>
    );

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
