import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MenuActions from '@/features/menu/components/layout/MenuActions';
import MenuFiltersList from '@/features/menu/components/layout/MenuFiltersList';
import MenuPageHeader from '@/features/menu/components/layout/MenuPageHeader';
import MenuTable from '@/features/menu/components/tables/MenuTable';

async function MenuPage() {
  return (
    <>
      <MenuPageHeader />

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
