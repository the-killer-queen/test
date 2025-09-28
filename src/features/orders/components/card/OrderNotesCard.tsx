import { P } from '@/components/typography/P';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/utils';
import { getOrderNotes } from '@/supabase/data/orders-service';
import { MessageSquare } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import CardError from '../error/CardError';

async function OrderNotesCard() {
  const { orderId } = searchParamsCache.all();
  if (!orderId) return null;

  const t = await getTranslations('orders');
  const { data: note, error } = await getOrderNotes(orderId);

  if (error)
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
        <P>{note || t('cards.notes.noNotes')}</P>
      </CardContent>
    </Card>
  );
}

export default OrderNotesCard;
