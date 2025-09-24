import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';
import { getOrderById } from '@/supabase/data/orders-service';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from 'lucide-react';
import CardError from '../error/CardError';
import { getTranslations } from 'next-intl/server';

async function OrderDetailsCard({ orderId }: { orderId: string }) {
  const t = await getTranslations('orders');
  const { data: order, error } = await getOrderById(orderId);

  if (error || !order)
    return (
      <CardError
        message={t('messages.error.failedToLoad', { item: 'order details' })}
      />
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <FileText className='h-4 w-4' />
          {t('cards.details.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <User className='size-4' />
            {t('cards.details.customer')}
          </span>
          <span className='text-sm font-semibold'>
            {order.customer_name || t('cards.details.walkInCustomer')}
          </span>
        </div>

        {order.customer_contact && (
          <>
            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-sm'>
                <Phone className='size-4' />
                {t('cards.details.contact')}
              </span>
              <span className='text-sm'>{order.customer_contact}</span>
            </div>
          </>
        )}

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <MapPin className='size-4' />
            {t('cards.details.type')}
          </span>
          <Badge variant='secondary'>
            {order.is_togo ? (
              <ShoppingBag className='size-3' />
            ) : (
              <MapPin className='size-3' />
            )}
            {order.is_togo ? t('type.togo') : t('type.dinein')}
          </Badge>
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <CreditCard className='size-4' />
            {t('cards.details.status')}
          </span>
          <Badge
            variant={order.status === 'paid' ? 'default' : 'outline'}
            className={
              order.status !== 'paid' ? 'border-warning text-warning' : ''
            }
          >
            {order.status === 'paid' ? (
              <CreditCard className='size-3' />
            ) : (
              <Clock className='size-3' />
            )}
            {t(`status.${order.status}`)}
          </Badge>
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <DollarSign className='size-4' />
            {t('cards.details.total')}
          </span>
          <span className='text-sm font-semibold'>
            {formatNumber({
              locale: 'en-US',
              number: order.total_price,
              options: {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
              },
            })}
          </span>
        </div>

        <Separator />
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground flex items-center gap-1 text-sm'>
            <Calendar className='size-4' />
            {t('cards.details.created')}
          </span>
          <span className='text-sm'>
            {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderDetailsCard;
