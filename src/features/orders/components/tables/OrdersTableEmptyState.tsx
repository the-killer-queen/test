'use client';

import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Search, ShoppingCart } from 'lucide-react';
import CreateOrderDialog from '../dialog/CreateOrderDialog';

type OrdersTableEmptyStateProps = {
  type: 'no-data' | 'no-results' | 'error';
  searchQuery?: string | null;
  filterBy?: string[] | null;
  onClearFilters?: () => void;
};

function OrdersTableEmptyState({
  type,
  searchQuery,
  filterBy,
  onClearFilters,
}: OrdersTableEmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: <Search className='text-muted-foreground h-12 w-12' />,
          title: searchQuery
            ? `No results for "${searchQuery}"`
            : 'No orders found',
          description:
            searchQuery || filterBy
              ? "Try adjusting your search or filters to find what you're looking for."
              : 'No orders match your current filters.',
          action:
            (searchQuery || filterBy) && onClearFilters ? (
              <Button
                variant='outline'
                onClick={onClearFilters}
                className='mt-4'
              >
                Clear filters
              </Button>
            ) : null,
        };

      case 'error':
        return {
          icon: <ShoppingCart className='text-muted-foreground h-12 w-12' />,
          title: 'Unable to load orders',
          description:
            'There was a problem loading your orders. Please try again.',
          action: (
            <Button
              variant='outline'
              onClick={() => window.location.reload()}
              className='mt-4'
            >
              Try again
            </Button>
          ),
        };

      case 'no-data':
      default:
        return {
          icon: <ShoppingCart className='text-muted-foreground h-12 w-12' />,
          title: 'No orders yet',
          description:
            'Get started by creating your first order to track customer purchases.',
          action: <CreateOrderDialog />,
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={9} className='h-64 md:h-96'>
          <div className='flex flex-col items-center justify-center gap-2 px-4 py-8 text-center md:gap-4 md:px-8 md:py-12'>
            {content.icon}
            <h3 className='text-foreground mt-2 text-base font-semibold md:text-lg'>
              {content.title}
            </h3>
            <p className='text-muted-foreground max-w-xs text-xs md:max-w-md md:text-sm'>
              {content.description}
            </p>
            {content.action}
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default OrdersTableEmptyState;
