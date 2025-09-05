import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MenuActions from '@/features/menu/components/page/MenuActions';
import MenuFiltersList from '@/features/menu/components/page/MenuFiltersList';
import MenuPageHeader from '@/features/menu/components/page/MenuPageHeader';
import MenuTable from '@/features/menu/components/table/MenuTable';
import { PageProps } from '@/types';

async function MenuPage({ searchParams }: PageProps) {
  return (
    <>
      <MenuPageHeader />

      <div className='mx-auto mt-8 flex max-w-7xl flex-col gap-4 px-4 md:mt-16'>
        <Card className='!gap-2'>
          <CardHeader>
            <CardTitle>Your Menu Items</CardTitle>
            <CardDescription>
              Easily manage and update your menu.
            </CardDescription>

            <MenuActions />
            <MenuFiltersList />
          </CardHeader>

          <CardContent>
            <MenuTable searchParams={searchParams} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MenuPage;
