'use client';

import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ChefHat, Search } from 'lucide-react';
import CreateMenuItemDialog from '../dialog/CreateMenuItemDialog';
import { useTranslations } from 'next-intl';

type MenuTableEmptyStateProps = {
  type: 'no-data' | 'no-results' | 'error';
  searchQuery?: string | null;
  filterBy?: string[] | null;
  onClearFilters?: () => void;
};

function MenuTableEmptyState({
  type,
  searchQuery,
  filterBy,
  onClearFilters,
}: MenuTableEmptyStateProps) {
  const t = useTranslations('menu');

  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: <Search className='text-muted-foreground h-12 w-12' />,
          title: searchQuery
            ? t('table.empty.noResults.title', { query: searchQuery })
            : t('table.empty.noResults.titleNoQuery'),
          description:
            searchQuery || filterBy
              ? t('table.empty.noResults.description')
              : t('table.empty.noResults.descriptionNoQuery'),
          action:
            (searchQuery || filterBy) && onClearFilters ? (
              <Button
                variant='outline'
                onClick={onClearFilters}
                className='mt-4'
              >
                {t('table.empty.noResults.clearFilters')}
              </Button>
            ) : null,
        };

      case 'error':
        return {
          icon: <ChefHat className='text-muted-foreground h-12 w-12' />,
          title: t('table.empty.error.title'),
          description: t('table.empty.error.description'),
          action: (
            <Button
              variant='outline'
              onClick={() => window.location.reload()}
              className='mt-4'
            >
              {t('table.empty.error.tryAgain')}
            </Button>
          ),
        };

      case 'no-data':
      default:
        return {
          icon: <ChefHat className='text-muted-foreground h-12 w-12' />,
          title: t('table.empty.noData.title'),
          description: t('table.empty.noData.description'),
          action: <CreateMenuItemDialog />,
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={6} className='h-96'>
          <div className='flex flex-col items-center justify-center gap-2 py-12 text-center'>
            {content.icon}
            <h3 className='text-foreground mt-2 text-lg font-semibold'>
              {content.title}
            </h3>
            <p className='text-muted-foreground max-w-md text-sm'>
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
