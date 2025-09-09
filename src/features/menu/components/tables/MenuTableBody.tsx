import { TableBody } from '@/components/ui/table';
import { getMenu } from '@/supabase/data/menu-service';
import { PageProps } from '@/types';
import {
  filterMenuItems,
  searchMenuItems,
  sortMenuItems,
} from '../../lib/utils';
import MenuTableRow from '../tables/MenuTableRow';
import MenuTableEmptyState from './MenuTableEmptyState';

async function MenuTableBody({ searchParams }: PageProps) {
  const { data: menu, error } = await getMenu();

  if (error || !menu) return <MenuTableEmptyState type='error' />;

  const params = await searchParams;

  //SEARCH Items
  const query = params.query as string | undefined;
  const searchedMenuItems = query ? searchMenuItems(query, menu) : menu;

  //SortBy
  const sortBy = params.sort_by || 'created_at-desc';
  const sortedMenuItems = sortMenuItems(sortBy, searchedMenuItems);

  //Filter
  const filterBy = params.filter_by;
  const filteredMenuItems = filterMenuItems(filterBy, sortedMenuItems);

  if (menu.length === 0) return <MenuTableEmptyState type='no-data' />;

  if (filteredMenuItems.length === 0)
    return (
      <MenuTableEmptyState
        type='no-results'
        searchQuery={query}
        filterBy={filterBy}
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

export default MenuTableBody;
