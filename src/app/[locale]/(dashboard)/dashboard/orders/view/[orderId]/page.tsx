import LayoutHeader from '@/components/shared/LayoutHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  OrderDetailsCard,
  OrderItemsCard,
  OrderNotesCard,
  OrderQuickActionsCard,
  UpdateOrderAction,
  OrderDetailsCardSkeleton,
  OrderNotesCardSkeleton,
  OrderItemsCardSkeleton,
} from '@/features/orders';
import { getAllOrdersId, getOrderById } from '@/supabase/data/orders-service';
import { ArrowLeft, Settings } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
  const ordersId = await getAllOrdersId();
  return ordersId.map((id) => ({ orderId: id.toString() }));
}

async function OrderViewPage({
  params,
}: PageProps<'/[locale]/dashboard/orders/view/[orderId]'>) {
  const t = await getTranslations('orders');
  const { orderId } = await params;

  const { data: order, error } = await getOrderById(orderId);
  if (!order || error) notFound();

  const locale = await getLocale();

  const orderDisplayName = order.order_name
    ? `#${order.order_name.replaceAll('-', ' ')}`
    : `#${order.id}`;

  return (
    <>
      <LayoutHeader
        title={t('view.title', { orderName: orderDisplayName })}
        description={t('view.description')}
      >
        <Button variant='link' size='sm' asChild>
          <Link
            href='/dashboard/orders'
            className={`flex ${locale === 'fa' ? 'flex-row-reverse' : ''} items-center`}
          >
            <ArrowLeft />
            <span className='hidden sm:block'>{t('view.goBack')}</span>
          </Link>
        </Button>
      </LayoutHeader>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>{t('view.overview.title')}</span>
              <Suspense
                fallback={
                  <Button variant='default' size='sm' disabled>
                    <span>Loading...</span>
                  </Button>
                }
              >
                <UpdateOrderAction
                  orderId={orderId}
                  variant='default'
                  className='[&_span]:hidden sm:[&_span]:inline-block'
                />
              </Suspense>
            </CardTitle>
            <CardDescription>{t('view.overview.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2'>
              {/* Left Column - Order Items */}
              <div className='w-full'>
                <Suspense fallback={<OrderItemsCardSkeleton />}>
                  <OrderItemsCard orderId={orderId} />
                </Suspense>
              </div>

              {/* Right Column - Details and Actions */}
              <div className='flex w-full flex-col space-y-4'>
                <Suspense fallback={<OrderDetailsCardSkeleton />}>
                  <OrderDetailsCard orderId={orderId} />
                </Suspense>

                <div className='flex w-full flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row'>
                  <Suspense
                    fallback={
                      <Card className='flex-1'>
                        <CardHeader>
                          <CardTitle className='flex items-center gap-2 text-base font-semibold'>
                            <Settings className='h-4 w-4' />
                            {t('cards.quickActions.title')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-2'>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Button
                              key={i}
                              variant='ghost'
                              size='sm'
                              className='w-full justify-start'
                              disabled
                            >
                              Loading...
                            </Button>
                          ))}
                        </CardContent>
                      </Card>
                    }
                  >
                    <OrderQuickActionsCard order={order} />
                  </Suspense>

                  <Suspense fallback={<OrderNotesCardSkeleton />}>
                    <OrderNotesCard orderId={orderId} />
                  </Suspense>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default OrderViewPage;
