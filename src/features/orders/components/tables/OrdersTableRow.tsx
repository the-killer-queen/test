'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { useExcludedColumnsQuery } from '@/hooks/useExcludedColumnsQuery';
import { formatNumber } from '@/lib/utils';
import { OrderRow } from '@/types/tables';
import { format } from 'date-fns';
import {
  Clock,
  CreditCard,
  Ellipsis,
  Eye,
  MapPin,
  ShoppingBag,
  SquarePen,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import DeleteOrderDialog from '../dialog/DeleteOrderDialog';
import EditOrderDialog from '../dialog/EditOrderDialog';
import OrderPreviewDialog from '../dialog/OrderPreviewDialog';

type OrdersTableRowProps = {
  order: OrderRow;
};

function OrdersTableRow({ order }: OrdersTableRowProps) {
  const { excludedColumns } = useExcludedColumnsQuery();

  const StatusIcon = order.status === 'paid' ? CreditCard : Clock;
  const TypeIcon = order.is_togo ? ShoppingBag : MapPin;

  return (
    <OrderPreviewDialog order={order}>
      <TableRow className='cursor-pointer'>
        {/* ORDER ID */}
        <TableCell className='font-semibold'>
          <Button
            variant={'outline'}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(order.id);
              toast.success('Copied to clipboard successfully');
            }}
          >
            #{order.id}
          </Button>
        </TableCell>

        {/* CUSTOMER NAME */}
        <TableCell className='font-medium'>
          {order.customer_name || 'Walk-in Customer'}
        </TableCell>

        {/* CUSTOMER CONTACT */}
        {!excludedColumns.includes('customer_contact') && (
          <TableCell className='text-muted-foreground'>
            {order.customer_contact || '—'}
          </TableCell>
        )}

        {/* ORDER TYPE */}
        {!excludedColumns.includes('order_type') && (
          <TableCell>
            <Badge variant={order.is_togo ? 'default' : 'secondary'}>
              <TypeIcon className='mr-1 h-3 w-3' />
              {order.is_togo ? 'To Go' : 'Dine In'}
            </Badge>
          </TableCell>
        )}

        {/* ITEMS COUNT */}
        {!excludedColumns.includes('items_count') && (
          <TableCell>
            <span className='text-muted-foreground text-sm'>
              {order.items?.length || 0} items
            </span>
          </TableCell>
        )}

        {/* STATUS */}
        {!excludedColumns.includes('status') && (
          <TableCell>
            <Badge
              variant={order.status === 'paid' ? 'default' : 'outline'}
              className={`${order.status === 'unpaid' ? 'border-warning text-warning' : ''} capitalize`}
            >
              <StatusIcon className='mr-1 h-3 w-3' />
              {order.status}
            </Badge>
          </TableCell>
        )}

        {/* TOTAL PRICE */}
        <TableCell className='font-semibold'>
          {formatNumber({
            locale: 'en-US',
            number: order.total_price,
          })}
        </TableCell>

        {/* CREATED AT */}
        <TableCell className='text-muted-foreground text-sm'>
          {format(new Date(order.created_at), 'MMM dd, HH:mm')}
        </TableCell>

        {/* ACTIONS */}
        <TableCell className='text-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant='ghost' className='h-0 w-0'>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className='mr-4'
              side='bottom'
              onClick={(e) => e.stopPropagation()}
            >
              <DeleteOrderDialog orderId={order.id} orderName={`#${order.id}`}>
                <DropdownMenuItem
                  variant='destructive'
                  className='hover:!bg-destructive/5 cursor-pointer'
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DeleteOrderDialog>

              <EditOrderDialog order={order}>
                <DropdownMenuItem className='!text-info [&_svg]:!text-info hover:!bg-info/5 cursor-pointer'>
                  <SquarePen />
                  Edit
                </DropdownMenuItem>
              </EditOrderDialog>

              <DropdownMenuItem
                asChild
                variant='default'
                className='hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer'
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  href={`/dashboard/orders/view/${order.id}`}
                  className='flex items-center gap-2'
                >
                  <Eye />
                  View Details
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </OrderPreviewDialog>
  );
}

export default OrdersTableRow;
