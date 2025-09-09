'use client';

import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ChefHat, Plus, Search } from 'lucide-react';
import Link from 'next/link';

type MenuTableEmptyStateProps = {
  type: 'no-data' | 'no-results' | 'error';
  searchQuery?: string;
  filterBy?: string;
  onClearFilters?: () => void;
};

function MenuTableEmptyState({
  type,
  searchQuery,
  filterBy,
  onClearFilters,
}: MenuTableEmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: <Search className='text-muted-foreground h-12 w-12' />,
          title: searchQuery
            ? `No results for "${searchQuery}"`
            : 'No menu items found',
          description:
            searchQuery || filterBy
              ? "Try adjusting your search or filters to find what you're looking for."
              : 'No menu items match your current filters.',
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
          icon: <ChefHat className='text-muted-foreground h-12 w-12' />,
          title: 'Unable to load menu items',
          description:
            'There was a problem loading your menu. Please try again.',
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
          icon: <ChefHat className='text-muted-foreground h-12 w-12' />,
          title: 'No menu items yet',
          description:
            'Get started by creating your first menu item to showcase your delicious offerings.',
          action: (
            <Button asChild className='mt-4'>
              <Link href='/dashboard/menu/create'>
                <Plus className='mr-2 h-4 w-4' />
                Add Menu Item
              </Link>
            </Button>
          ),
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={6} className='h-96'>
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            {content.icon}
            <h3 className='text-foreground mt-4 text-lg font-semibold'>
              {content.title}
            </h3>
            <p className='text-muted-foreground mt-2 max-w-md text-sm'>
              {content.description}
            </p>
            {content.action}
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default MenuTableEmptyState;
