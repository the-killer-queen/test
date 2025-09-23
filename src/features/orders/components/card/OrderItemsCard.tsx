import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';
import { getOrderById } from '@/supabase/data/orders-service';
import { ShoppingCart } from 'lucide-react';
import CardError from '../error/CardError';

async function OrderItemsCard({ orderId }: { orderId: string }) {
  const { data: order, error } = await getOrderById(orderId);

  if (error || !order)
    return <CardError message='Failed to load order items' />;

  const items = order.items || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <ShoppingCart className='h-4 w-4' />
          Order Items ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className='text-muted-foreground flex items-center justify-center py-8 text-sm'>
            No items in this order
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
                      {formatNumber({
                        locale: 'en-US',
                        number: item.price * item.quantity,
                        options: {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 2,
                        },
                      })}
                    </span>
                    <span className='text-muted-foreground text-xs'>
                      {formatNumber({
                        locale: 'en-US',
                        number: item.price,
                        options: {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 2,
                        },
                      })}{' '}
                      each
                    </span>
                  </div>
                </div>
                {index < items.length - 1 && <Separator className='mt-3' />}
              </div>
            ))}

            <Separator className='my-4' />

            <div className='flex items-center justify-between'>
              <span className='text-base font-semibold'>Total</span>
              <span className='text-lg font-bold'>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderItemsCard;
