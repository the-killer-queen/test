import { getMenu } from '@/supabase/data/menu-service';
import MenuTableBodyClient from './MenuTableBodyClient';
import MenuTableEmptyState from './MenuTableEmptyState';

async function MenuTableBody() {
  const { data: menu, error } = await getMenu();
  if (error || !menu) return <MenuTableEmptyState type='error' />;

  return <MenuTableBodyClient menu={menu} />;
}

export default MenuTableBody;
