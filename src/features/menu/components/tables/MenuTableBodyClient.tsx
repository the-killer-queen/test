'use client';

import { TableBody } from '@/components/ui/table';
import { MenuRow } from '@/types/tables';
import { useQueryState } from 'nuqs';
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

  //SEARCH Items
  const searchedMenuItems = query ? searchMenuItems(query, menu) : menu;

  //SortBy
  const sortedMenuItems = sortMenuItems(sortBy, searchedMenuItems);

  //Filter
  const filteredMenuItems = filterMenuItems(filters, sortedMenuItems);

  if (menu.length === 0) return <MenuTableEmptyState type='no-data' />;

  if (filteredMenuItems.length === 0)
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
      {filteredMenuItems.map((menuItem) => (
        <MenuTableRow key={menuItem.id} menuItem={menuItem} />
      ))}
    </TableBody>
  );
}

export default MenuTableBodyClient;
