'use client';

import { TableBody } from '@/components/ui/table';
import { RESULT_PER_PAGE } from '@/config/config';
import { MenuRow } from '@/types/tables';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useFiltersQuery } from '../../../../hooks/useFiltersQuery';
import { useSortByQuery } from '../../../../hooks/useSortByQuery';
import {
  filterMenuItems,
  searchMenuItems,
  sortMenuItems,
} from '../../lib/utils';
import MenuTableRow from '../tables/MenuTableRow';
import MenuTableEmptyState from './MenuTableEmptyState';

type MenuTableBodyClientProps = {
  menu: MenuRow[];
};

function MenuTableBodyClient({ menu }: MenuTableBodyClientProps) {
  const { setFilter, filters } = useFiltersQuery();
  const { sortBy } = useSortByQuery();
  const [query, setQuery] = useQueryState('query');
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));

  //SEARCH Items
  const searchedMenuItems = query ? searchMenuItems(query, menu) : menu;

  //SortBy
  const sortedMenuItems = sortMenuItems(sortBy, searchedMenuItems);

  //Filter
  const filteredMenuItems = filterMenuItems(filters, sortedMenuItems);

  //RESULT PER PAGE
  const menuItemsPerPage = filteredMenuItems.slice(
    (page - 1) * RESULT_PER_PAGE,
    page * RESULT_PER_PAGE,
  );

  if (menuItemsPerPage.length === 0)
    return <MenuTableEmptyState type='no-data' />;

  if (menuItemsPerPage.length === 0)
    return (
      <MenuTableEmptyState
        type='no-results'
        searchQuery={query}
        filterBy={filters}
        onClearFilters={() => {
          setQuery(null);
          setFilter([]);
        }}
      />
    );

  return (
    <TableBody>
      {menuItemsPerPage.map((menuItem) => (
        <MenuTableRow key={menuItem.id} menuItem={menuItem} />
      ))}
    </TableBody>
  );
}

export default MenuTableBodyClient;
