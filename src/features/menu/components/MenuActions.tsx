import FilterBy from '@/components/shared/FilterBy';
import Search from '@/components/shared/Search';
import SortBy from '@/components/shared/SortBy';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getMenuCategories } from '@/supabase/data/menu-service';
import { menuFilterOptions } from '../lib/utils';
import MenuFiltersList from './MenuFiltersList';

async function MenuActions() {
  const { data: categories, error } = await getMenuCategories();

  if (error || !categories) return <p>{error}!!!</p>;

  return (
    <Card className='!gap-2'>
      <CardHeader className='!gap-0'>
        <CardTitle>Dashboard Overview</CardTitle>
        <CardDescription>
          Track and manage your menu items efficiently.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex gap-2'>
          <FilterBy options={menuFilterOptions(categories)} />

          <SortBy
            options={[
              {
                value: 'created_at-desc',
                label: 'Sort by date (newest first)',
              },
              { value: 'created_at-asc', label: 'Sort by date (oldest first)' },
              { value: 'name-asc', label: 'Sort by name (A - Z)' },
              { value: 'name-desc', label: 'Sort by name (Z - A)' },
              { value: 'price-desc', label: 'Sort by price (high - low)' },
              { value: 'price-asc', label: 'Sort by price (low - high)' },
            ]}
          />

          <Search placeholder='Search menu items...' />
        </div>

        <MenuFiltersList />
      </CardContent>
    </Card>
  );
}

export default MenuActions;
