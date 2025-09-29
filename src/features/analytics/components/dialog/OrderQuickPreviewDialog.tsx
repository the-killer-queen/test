'use client';

import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { getDateLibPromise } from '@/lib/utils';
import { OrderRow } from '@/types/tables';
import {
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { cloneElement, ReactElement, use, useState } from 'react';

type OrderQuickPreviewDialogProps = {
  order: OrderRow;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function OrderQuickPreviewDialog({ order, children }: OrderQuickPreviewDialogProps) {
  const t = useTranslations('analytics');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locale = useLocale();
  const dateFormat = use(getDateLibPromise(locale));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {cloneElement(children, {
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        },
      })}

      <DialogContent className='max-w-xs md:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-sm md:text-base'>
            <div className='flex items-center gap-1'>
              <span>#</span>
              {order?.order_name || order.id}
            </div>
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            {t('dialog.orderPreview.description')}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-2 px-2 md:space-y-4 md:px-4'>
          {/* Customer Info */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <User className='size-3 md:size-4' />
                {t('dialog.orderPreview.customer')}
              </span>
              <span className='text-xs font-medium md:text-sm'>
                {order.customer_name || t('walkInCustomer')}
              </span>
            </div>

            {order.customer_contact && (
              <>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                    <Phone className='size-3 md:size-4' />
                    {t('dialog.orderPreview.contact')}
                  </span>
                  <span className='text-xs md:text-sm'>
                    {order.customer_contact}
                  </span>
                </div>
              </>
            )}

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <MapPin className='size-3 md:size-4' />
                {t('dialog.orderPreview.type')}
              </span>
              <Badge className='w-18' variant={'outline'}>
                {order.is_togo ? <ShoppingBag /> : <MapPin />}
                {order.is_togo ? t('type.togo') : t('type.dinein')}
              </Badge>
            </div>

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <CreditCard className='size-3 md:size-4' />
                {t('dialog.orderPreview.status')}
              </span>
              <Badge
                variant={'outline'}
                className={`${order.status !== 'paid' ? 'border-warning text-warning' : ''} w-18 capitalize`}
              >
                {order.status === 'paid' ? <CreditCard /> : <Clock />}
                {t(`status.${order.status}`)}
              </Badge>
            </div>

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <DollarSign className='size-3 md:size-4' />
                {t('dialog.orderPreview.total')}
              </span>
              <span className='text-xs font-semibold md:text-sm'>
                <CurrencyDisplay amount={order.total_price} />
              </span>
            </div>

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <Calendar className='size-3 md:size-4' />
                {t('dialog.orderPreview.created')}
              </span>
              <span className='text-xs md:text-sm'>
                {dateFormat.format(
                  new Date(order.created_at),
                  'd MMM yyyy, HH:mm',
                )}
              </span>
            </div>
          </div>

          {/* Order Items */}
          {order.items && order.items.length > 0 && (
            <div className='space-y-2'>
              <h4 className='text-xs font-medium md:text-sm'>
                {t('dialog.orderPreview.orderItems')}
              </h4>
              <div className='bg-muted/50 max-h-24 space-y-1 overflow-y-auto rounded-md p-2 md:max-h-48'>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between text-xs md:text-sm'
                  >
                    <Badge variant={'outline'}>
                      {item.quantity}x {item.name}
                    </Badge>
                    <span className='font-medium'>
                      <CurrencyDisplay amount={item.price * item.quantity} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className='space-y-2'>
              <h4 className='text-xs font-medium md:text-sm'>
                {t('dialog.orderPreview.notes')}
              </h4>
              <p className='bg-muted/50 rounded-md p-2 text-xs md:text-sm'>
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrderQuickPreviewDialog;