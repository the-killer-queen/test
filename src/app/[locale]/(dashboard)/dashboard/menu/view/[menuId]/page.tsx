import LayoutHeader from '@/components/shared/LayoutHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MenuItemDescriptonCard from '@/features/menu/components/card/MenuItemDescriptonCard';
import MenuItemDetailsCard from '@/features/menu/components/card/MenuItemDetailsCard';
import MenuItemImageCard from '@/features/menu/components/card/MenuItemImageCard';
import MenuItemIngredientsCard from '@/features/menu/components/card/MenuItemIngredientsCard';
import MenuItemQuickActionsCard from '@/features/menu/components/card/MenuItemQuickActionsCard';
import UpdateMenuItemAction from '@/features/menu/components/layout/UpdateMenuItemAction';
import {
  checkMenuItemExists,
  getAllMenuItemIds,
} from '@/supabase/data/menu-service';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const ids = await getAllMenuItemIds();
  return ids.map((id) => ({ menuId: id.toString() }));
}

async function MenuItemPageView({
  params,
}: PageProps<'/[locale]/dashboard/menu/view/[menuId]'>) {
  const { menuId } = await params;
  const { exists, error } = await checkMenuItemExists(+menuId);

  if (!exists || error) notFound();

  return (
    <>
      <LayoutHeader
        title={'Menu Item Preview'}
        description={'Preview and manage your menu item details.'}
      >
        <Button variant='link' size='sm' asChild>
          <Link href={'/dashboard/menu'}>
            <ArrowLeft />
            <span className='hidden sm:block'>Go Back</span>
          </Link>
        </Button>
      </LayoutHeader>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>Menu Item Details</span>
              <UpdateMenuItemAction
                menuId={menuId}
                variant={'default'}
                className='[&_span]:hidden sm:[&_span]:inline-block'
              />
            </CardTitle>
            <CardDescription>
              View details, ingredients, and quick actions for this item.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2'>
              <div className='max-h-160 w-full'>
                <MenuItemImageCard menuId={menuId} />
              </div>

              <div className='flex w-full flex-col space-y-4'>
                <MenuItemDetailsCard menuId={menuId} />

                <MenuItemIngredientsCard menuId={menuId} />

                <div className='flex w-full flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row'>
                  <MenuItemQuickActionsCard menuId={menuId} />

                  <MenuItemDescriptonCard menuId={menuId} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MenuItemPageView;
