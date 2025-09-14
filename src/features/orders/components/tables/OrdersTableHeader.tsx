'use client';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useExcludedColumnsQuery } from '@/hooks/useExcludedColumnsQuery';
import {
  User,
  Phone,
  MapPin,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Calendar,
} from 'lucide-react';

const headers = [
  { value: 'order_id', label: 'Order ID', icon: ShoppingCart },
  { value: 'customer_name', label: 'Customer', icon: User },
  { value: 'customer_contact', label: 'Contact', icon: Phone },
  { value: 'order_type', label: 'Type', icon: MapPin },
  { value: 'items_count', label: 'Items', icon: ShoppingCart },
  { value: 'status', label: 'Status', icon: CreditCard },
  { value: 'total_price', label: 'Total', icon: DollarSign },
  { value: 'created_at', label: 'Date', icon: Calendar },
];

function OrdersTableHeader() {
  const { excludedColumns } = useExcludedColumnsQuery();

  return (
    <TableHeader>
      <TableRow>
        {headers
          .filter((header) => !excludedColumns.includes(header.value))
          .map((header) => (
            <TableHead key={header.value}>
              <span className='flex items-center gap-1'>
                {header.icon && <header.icon className='size-3 md:size-4' />}
                {header.label}
              </span>
            </TableHead>
          ))}

        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default OrdersTableHeader;
