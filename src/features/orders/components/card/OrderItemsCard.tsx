import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/utils';
import { getOrderItems } from '@/supabase/data/orders-service';
import { ShoppingCart } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import TotalPriceContent from '../content/OrderTotalPriceContent';
import CardError from '../error/CardError';
import TotalPriceContentSkeleton from '../skeletons/TotalPriceContentSkeleton';

async function OrderItemsCard() {
  const { orderId } = searchParamsCache.all();
  if (!orderId) return null;

  const t = await getTranslations('orders');
  const { data: order, error } = await getOrderItems(orderId);

  if (error || !order)
    return (
      <CardError
        message={t('messages.error.failedToLoad', { item: 'order items' })}
      />
    );

  const locale = await getLocale();
  const items = order || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <ShoppingCart className='h-4 w-4' />
          {t('cards.items.title', { count: items.length })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className='text-muted-foreground flex items-center justify-center py-8 text-sm'>
            {t('cards.items.noItems')}
          </div>
        ) : (
          <div className='space-y-3'>
            {items.map((item, index) => (
              <div key={index}>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='outline' className='px-2 py-1'>
                      {item.quantity}x
                    </Badge>
                    <span className='font-medium'>{item.name}</span>
                  </div>
                  <div className='flex flex-col items-end gap-1'>
                    <span className='text-sm font-semibold'>
                      <CurrencyDisplay amount={item.price * item.quantity} />
                    </span>
                    <span
                      className={`text-muted-foreground flex items-center text-xs ${locale === 'fa' ? 'flex-row-reverse' : ''} gap-1`}
                    >
                      <CurrencyDisplay
                        className='size-3 xl:size-4'
                        amount={item.price}
                      />
                      {t('cards.items.each')}
                    </span>
                  </div>
                </div>
                {index < items.length - 1 && <Separator className='mt-3' />}
              </div>
            ))}

            <Separator className='my-4' />

            <Suspense fallback={<TotalPriceContentSkeleton />}>
              <TotalPriceContent />
            </Suspense>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderItemsCard;
