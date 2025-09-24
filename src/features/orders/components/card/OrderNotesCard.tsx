import { P } from '@/components/typography/P';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOrderById } from '@/supabase/data/orders-service';
import { MessageSquare } from 'lucide-react';
import CardError from '../error/CardError';
import { getTranslations } from 'next-intl/server';

async function OrderNotesCard({ orderId }: { orderId: string }) {
  const t = await getTranslations('orders');
  const { data: order, error } = await getOrderById(orderId);

  if (error || !order)
    return (
      <CardError
        message={t('messages.error.failedToLoad', { item: 'order notes' })}
      />
    );

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <MessageSquare className='h-4 w-4' />
          {t('cards.notes.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <P>{order.notes || t('cards.notes.noNotes')}</P>
      </CardContent>
    </Card>
  );
}

export default OrderNotesCard;
