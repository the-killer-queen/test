'use client';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';
import { OrderRow } from '@/types/tables';
import { format } from 'date-fns';
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
import { cloneElement, ReactElement, useState } from 'react';

type OrderPreviewDialogProps = {
  order: OrderRow;
  children: ReactElement<{ onClick: (e: MouseEvent) => void }>;
};

function OrderPreviewDialog({ order, children }: OrderPreviewDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {cloneElement(children, {
        onClick: (e) => {
          e.preventDefault();
          setIsOpen(true);
        },
      })}

      <DialogContent className='max-w-xs md:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-sm md:text-base'>
            #{order?.order_name || order.id}
          </DialogTitle>
          <DialogDescription className='text-xs md:text-sm'>
            Quick preview of order details
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-2 px-2 md:space-y-4 md:px-4'>
          {/* Customer Info */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <User className='size-3 md:size-4' />
                Customer
              </span>
              <span className='text-xs font-medium md:text-sm'>
                {order.customer_name || 'Walk-in Customer'}
              </span>
            </div>

            {order.customer_contact && (
              <>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                    <Phone className='size-3 md:size-4' />
                    Contact
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
                Type
              </span>
              <Badge className='w-18' variant={'outline'}>
                {order.is_togo ? <ShoppingBag /> : <MapPin />}
                {order.is_togo ? 'To Go' : 'Dine In'}
              </Badge>
            </div>

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <MapPin className='size-3 md:size-4' />
                Status
              </span>
              <Badge
                variant={'outline'}
                className={`${order.status !== 'paid' ? 'border-warning text-warning' : ''} w-18 capitalize`}
              >
                {order.status === 'paid' ? <CreditCard /> : <Clock />}
                {order.status}
              </Badge>
            </div>

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <DollarSign className='size-3 md:size-4' />
                Total
              </span>
              <span className='text-xs font-semibold md:text-sm'>
                {formatNumber({
                  locale: 'en-US',
                  number: order.total_price,
                  options: {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 4,
                  },
                })}
              </span>
            </div>

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-xs md:text-sm'>
                <Calendar className='size-3 md:size-4' />
                Created
              </span>
              <span className='text-xs md:text-sm'>
                {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className='space-y-2'>
            <h4 className='text-xs font-medium md:text-sm'>Order Items</h4>
            <div className='bg-muted/50 max-h-24 space-y-1 overflow-y-auto rounded-md p-2 md:max-h-48'>
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between text-xs md:text-sm'
                >
                  <Badge variant={'outline'}>
                    {item.quantity}x {item.name}
                  </Badge>
                  <span className='font-medium'>
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
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className='space-y-2'>
              <h4 className='text-xs font-medium md:text-sm'>Notes</h4>
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

export default OrderPreviewDialog;
