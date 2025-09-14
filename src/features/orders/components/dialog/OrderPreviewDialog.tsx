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
  MapPin,
  Phone,
  ShoppingBag,
  User,
  DollarSign,
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

      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <ShoppingBag className='h-5 w-5' />
            Order #{order.id}
          </DialogTitle>
          <DialogDescription>Quick preview of order details</DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Customer Info */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-sm'>
                <User className='size-4' />
                Customer
              </span>
              <span className='text-sm font-medium'>
                {order.customer_name || 'Walk-in Customer'}
              </span>
            </div>

            {order.customer_contact && (
              <>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground flex items-center gap-1 text-sm'>
                    <Phone className='size-4' />
                    Contact
                  </span>
                  <span className='text-sm'>{order.customer_contact}</span>
                </div>
              </>
            )}

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-sm'>
                <MapPin className='size-4' />
                Type
              </span>
              <Badge variant={order.is_togo ? 'default' : 'secondary'}>
                {order.is_togo ? 'To Go' : 'Dine In'}
              </Badge>
            </div>

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-sm'>
                <DollarSign className='size-4' />
                Total
              </span>
              <span className='text-sm font-semibold'>
                {formatNumber({
                  locale: 'en-US',
                  number: order.total_price,
                })}
              </span>
            </div>

            <Separator />
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground flex items-center gap-1 text-sm'>
                <Calendar className='size-4' />
                Created
              </span>
              <span className='text-sm'>
                {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className='space-y-2'>
            <h4 className='text-sm font-medium'>Order Items</h4>
            <div className='bg-muted/50 max-h-32 space-y-1 overflow-y-auto rounded-md p-2'>
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between text-sm'
                >
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span className='font-medium'>
                    {formatNumber({
                      locale: 'en-US',
                      number: item.price * item.quantity,
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className='space-y-2'>
              <h4 className='text-sm font-medium'>Notes</h4>
              <p className='bg-muted/50 rounded-md p-2 text-sm'>
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
