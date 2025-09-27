import LayoutHeader from '@/components/shared/LayoutHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  MenuItemDescriptonCard,
  MenuItemDetailsCard,
  MenuItemImageCard,
  MenuItemIngredientsCard,
  MenuItemQuickActionsCard,
  UpdateMenuItemAction,
} from '@/features/menu';
import { Link } from '@/i18n/navigation';
import {
  checkMenuItemExists,
  getAllMenuItemIds,
  getMenuItemById,
} from '@/supabase/data/menu-service';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/dashboard/menu/view/[menuId]'>): Promise<Metadata> {
  // const t = await getTranslations();

  const { menuId } = await params;
  const { data, error } = await getMenuItemById(+menuId);

  if (!data || error) notFound();

  return {
    title: data.name,
  };
}

export async function generateStaticParams() {
  const ids = await getAllMenuItemIds();
  return ids.map((id) => ({ menuId: id.toString() }));
}

async function MenuItemPageView({
  params,
}: PageProps<'/[locale]/dashboard/menu/view/[menuId]'>) {
  const t = await getTranslations('menu');
  const { menuId } = await params;
  const { exists, error } = await checkMenuItemExists(+menuId);

  if (!exists || error) notFound();

  return (
    <>
      <LayoutHeader title={t('view.title')} description={t('view.description')}>
        <Button variant='link' size='sm' asChild>
          <Link href={'/dashboard/menu'}>
            <ArrowLeft />
            <span className='hidden sm:block'>{t('view.goBack')}</span>
          </Link>
        </Button>
      </LayoutHeader>

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>{t('view.details.title')}</span>
              <UpdateMenuItemAction
                menuId={menuId}
                variant={'default'}
                className='[&_span]:hidden sm:[&_span]:inline-block'
              />
            </CardTitle>
            <CardDescription>{t('view.details.description')}</CardDescription>
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
