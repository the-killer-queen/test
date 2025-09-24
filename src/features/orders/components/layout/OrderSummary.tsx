'use client';

import { Large } from '@/components/typography/Large';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import { X } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';
import { OrderItem } from '../../lib/types';
import { useTranslations } from 'next-intl';

type OrderSummaryProps = { field: ControllerRenderProps };

function OrderSummary({ field }: OrderSummaryProps) {
  const t = useTranslations('orders');

  if (field.value.length === 0) return null;

  function removeItem(id: number) {
    field.onChange(field.value.filter((item: OrderItem) => item.id !== id));
  }

  return (
    <Card className='border-none !bg-transparent !shadow-none'>
      <CardHeader className='p-0'>
        <div className='flex items-center justify-between'>
          <CardTitle>
            <Large>
              {formatNumber({
                locale: 'en-US',
                options: {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 3,
                },
                number: field.value.reduce(
                  (total: number, item: OrderItem) =>
                    total + item.price * item.quantity,
                  0,
                ),
              })}
            </Large>
          </CardTitle>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => field.onChange([])}
            className='text-destructive hover:text-destructive h-6 px-2 text-xs md:h-8 md:px-3 md:text-sm'
          >
            {t('menuSelector.clearAll')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='h-max max-h-36 overflow-y-auto'>
          <div className='grid grid-cols-1 items-center gap-1 md:gap-2 lg:grid-cols-2'>
            {field.value.map((item: OrderItem, i: number) => (
              <div
                key={i}
                className='bg-muted/50 flex items-center justify-between rounded-xl border p-1 md:p-2'
              >
                <div className='flex items-center gap-1 md:gap-2'>
                  <Badge
                    variant='outline'
                    className='px-1 py-0 text-xs md:px-2 md:py-1'
                  >
                    {item.quantity}x
                  </Badge>
                  <span className='text-xs font-medium md:text-sm'>
                    {item.name}
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
                    })}
                    {t('cards.items.each')}
                  </span>
                </div>

                <div className='flex items-center gap-1 md:gap-2'>
                  <span className='text-xs font-semibold md:text-sm'>
                    {formatNumber({
                      locale: 'en-US',
                      number: item.price * item.quantity,
                      options: {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 3,
                      },
                    })}
                  </span>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='text-destructive hover:text-destructive h-4 w-4 md:h-6 md:w-6'
                    onClick={() => removeItem(item.id)}
                  >
                    <X className='h-3 w-3 md:h-4 md:w-4' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderSummary;
