import { TableBody } from '@/components/ui/table';
import { getMenu } from '@/supabase/data/menu-service';
import { PageProps } from '@/types';
import {
  filterMenuItems,
  searchMenuItems,
  sortMenuItems,
} from '../../lib/utils';
import Row from './Row';

async function Body({ searchParams }: PageProps) {
  const { data: menu, error } = await getMenu();
  if (error || !menu) return <p>Failed to fetch data!!!!</p>;

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

  return (
    <TableBody>
      {filteredMenuItems.map((menuItem) => (
        <Row key={menuItem.id} menuItem={menuItem} />
      ))}
    </TableBody>
  );
}

export default Body;
