import LayoutHeader from '@/components/shared/LayoutHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MenuActions, MenuTable } from '@/features/menu';
import MenuFiltersList from '@/components/shared/FiltersList';

function MenuPage() {
  return (
    <>
      <LayoutHeader
        title={'Manage Your Menu'}
        description={
          'Create, organize, and manage your menu items in one place.'
        }
      />

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle>Your Menu Items</CardTitle>
            <CardDescription>
              Easily manage and update your menu.
            </CardDescription>

            <MenuActions />
            <MenuFiltersList />
          </CardHeader>

          <CardContent>
            <MenuTable />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MenuPage;
