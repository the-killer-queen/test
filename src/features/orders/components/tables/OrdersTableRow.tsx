'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { useExcludedColumnsQuery } from '@/hooks/useExcludedColumnsQuery';
import { Link } from '@/i18n/navigation';
import { formatNumber } from '@/lib/utils';
import { OrderRow } from '@/types/tables';
import { format } from 'date-fns';
import { Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import { handleCopyOrderId } from '../../lib/utils';
import DeleteOrderDialog from '../dialog/DeleteOrderDialog';
import EditOrderDialog from '../dialog/EditOrderDialog';
import OrderPreviewDialog from '../dialog/OrderPreviewDialog';
import OrderIsPaidSelector from '../selects/OrderIsPaidSelector';
import OrderIsToGoSelector from '../selects/OrderIsToGoSelector';

type OrdersTableRowProps = {
  order: OrderRow;
};

function OrdersTableRow({ order }: OrdersTableRowProps) {
  const { excludedColumns } = useExcludedColumnsQuery();

  return (
    <OrderPreviewDialog order={order}>
      <TableRow className='cursor-pointer'>
        {/* ORDER ID */}
        <TableCell className='px-2 font-semibold md:px-4'>
          <Button
            variant={'outline'}
            onClick={(e) => handleCopyOrderId(e, order)}
          >
            #
            {order.order_name
              ? order.order_name.replaceAll('-', ' ')
              : order.id}
          </Button>
        </TableCell>

        {/* CUSTOMER NAME */}
        <TableCell className='px-2 text-sm font-medium md:px-4'>
          {order.customer_name || 'Walk-in Customer'}
        </TableCell>

        {/* CUSTOMER CONTACT */}
        {!excludedColumns.includes('customer_contact') && (
          <TableCell className='text-muted-foreground px-2 text-xs md:px-4'>
            {order.customer_contact || '—'}
          </TableCell>
        )}

        {/* ORDER TYPE */}
        {!excludedColumns.includes('order_type') && (
          <TableCell className='px-2 md:px-4'>
            <OrderIsToGoSelector order={order} />
          </TableCell>
        )}

        {/* ITEMS COUNT */}
        {!excludedColumns.includes('items_count') && (
          <TableCell className='px-2 md:px-4'>
            <span className='text-muted-foreground text-xs'>
              {order.items?.length || 0} items
            </span>
          </TableCell>
        )}

        {/* STATUS */}
        {!excludedColumns.includes('status') && (
          <TableCell className='px-2 md:px-4'>
            <OrderIsPaidSelector order={order} />
          </TableCell>
        )}

        {/* TOTAL PRICE */}
        <TableCell className='px-2 text-sm font-semibold md:px-4'>
          {formatNumber({
            locale: 'en-US',
            number: order.total_price,
            options: {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 3,
            },
          })}
        </TableCell>

        {/* CREATED AT */}
        <TableCell className='text-muted-foreground px-2 text-xs md:px-4'>
          {format(new Date(order.created_at), 'MMM dd, HH:mm')}
        </TableCell>

        {/* ACTIONS */}
        <TableCell className='px-2 text-end md:px-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant='ghost' className='h-0 w-0'>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
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
