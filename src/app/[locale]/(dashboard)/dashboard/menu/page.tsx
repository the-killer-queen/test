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
import { getTranslations } from 'next-intl/server';

async function MenuPage() {
  const t = await getTranslations('menu');

  return (
    <>
      <LayoutHeader
        title={t('page.title')}
        description={t('page.description')}
      />

      <div className='flex flex-col gap-4 p-4'>
        <Card>
          <CardHeader>
            <CardTitle>{t('table.title')}</CardTitle>
            <CardDescription>{t('table.description')}</CardDescription>

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
