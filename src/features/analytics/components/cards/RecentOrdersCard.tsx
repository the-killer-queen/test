'use client';

import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { getDateLibPromise } from '@/lib/utils';
import { OrderRow } from '@/types/tables';
import { Clock, CreditCard, Eye, MapPin, ShoppingBag } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { use } from 'react';
import OrderQuickPreviewDialog from '../dialog/OrderQuickPreviewDialog';

type RecentOrdersCardProps = {
  orders: OrderRow[];
  period: string;
};

function RecentOrdersCard({ orders, period }: RecentOrdersCardProps) {
  const t = useTranslations('analytics');
  const locale = useLocale();
  const dateLib = use(getDateLibPromise(locale));

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>{t('cards.recentOrders.title')}</CardTitle>
            <CardDescription>
              {t('cards.recentOrders.description', { period })}
            </CardDescription>
          </div>
          <Button variant='outline' size='sm' asChild>
            <Link href='/dashboard/orders'>
              {t('cards.recentOrders.viewAll')}
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {orders.length === 0 ? (
          <div className='text-muted-foreground flex items-center justify-center py-8 text-sm'>
            {t('cards.recentOrders.noOrders')}
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className='hover:bg-accent/50 flex items-center justify-between rounded-lg border p-3 transition-colors'
            >
              <div className='flex items-center space-x-3'>
                <div className='flex flex-col'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium'>
                      #{order.order_name || order.id}
                    </span>
                    <Badge
                      variant={order.status === 'paid' ? 'default' : 'outline'}
                      className={`text-xs ${
                        order.status !== 'paid' ? 'border-warning text-warning' : ''
                      }`}
                    >
                      {order.status === 'paid' ? (
                        <CreditCard className='size-3' />
                      ) : (
                        <Clock className='size-3' />
                      )}
                      {t(`status.${order.status}`)}
                    </Badge>
                    <Badge variant='secondary' className='text-xs'>
                      {order.is_togo ? (
                        <ShoppingBag className='size-3' />
                      ) : (
                        <MapPin className='size-3' />
                      )}
                      {order.is_togo ? t('type.togo') : t('type.dinein')}
                    </Badge>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground text-xs'>
                      {order.customer_name || t('walkInCustomer')}
                    </span>
                    <span className='text-muted-foreground text-xs'>
                      {dateLib.format(new Date(order.created_at), 'MMM d, HH:mm')}
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold'>
                  <CurrencyDisplay amount={order.total_price} />
                </span>
                <div className='flex items-center gap-1'>
                  <OrderQuickPreviewDialog order={order}>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <Eye className='h-4 w-4' />
                    </Button>
                  </OrderQuickPreviewDialog>
                  <Button variant='ghost' size='icon' className='h-8 w-8' asChild>
                    <Link href={`/dashboard/orders/view/${order.id}`}>
                      <Eye className='h-4 w-4' />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default RecentOrdersCard;