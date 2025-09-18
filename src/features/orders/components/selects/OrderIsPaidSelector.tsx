'use client';

import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { updateOrderStatus } from '@/supabase/data/orders-service';
import { OrderRow } from '@/types/tables';
import { Clock, CreditCard } from 'lucide-react';
import { MouseEvent, useOptimistic, useTransition } from 'react';

type OrderIsPaidSelectorProps = { order: OrderRow };

function OrderIsPaidSelector({ order }: OrderIsPaidSelectorProps) {
  const [, startTransition] = useTransition();
  const [optimisticOrder, setOptimisticOrder] = useOptimistic(
    order,
    (curOrder, status: 'paid' | 'unpaid') => ({
      ...curOrder,
      status,
    }),
  );

  const isPaid = optimisticOrder.status === 'paid';

  async function handleUpdateStatus(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    selectedStatus: string,
  ) {
    e.stopPropagation();

    if (selectedStatus === order.status) return;

    startTransition(async () => {
      updateOrderStatus(order.id, order.status === 'paid' ? 'unpaid' : 'paid');
    });

    setOptimisticOrder(order.status === 'paid' ? 'unpaid' : 'paid');
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger asChild>
            <Badge
              onClick={(e) => e.stopPropagation()}
              variant={isPaid ? 'default' : 'outline'}
              className={`${!isPaid ? 'border-warning text-warning' : ''} capitalize`}
            >
              {isPaid ? <CreditCard /> : <Clock />}
              {optimisticOrder.status}
            </Badge>
          </DropdownMenuTrigger>
        </TooltipTrigger>

        <TooltipContent>Right click to update</TooltipContent>
      </Tooltip>

      <DropdownMenuContent className='min-w-12 !px-0 !py-0'>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => handleUpdateStatus(e, 'paid')}
            className={isPaid ? 'bg-accent/50' : ''}
          >
            <Badge className='flex w-full items-center justify-start'>
              <CreditCard />
              Paid
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => handleUpdateStatus(e, 'unpaid')}
            className={!isPaid ? 'bg-accent/50' : ''}
          >
            <Badge
              variant={'outline'}
              className='flex w-full items-center justify-start'
            >
              <Clock />
              Unpaid
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      <Dialog></Dialog>
    </DropdownMenu>
  );
}

export default OrderIsPaidSelector;
