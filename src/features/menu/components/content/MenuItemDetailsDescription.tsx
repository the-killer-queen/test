import ErrorState from '@/components/shared/ErrorState';
import { P } from '@/components/typography/P';
import { searchParamsCache } from '@/lib/utils';
import { getMenuItemDescription } from '@/supabase/data/menu-service';
import { getTranslations } from 'next-intl/server';

async function MenuItemDetailsDescription() {
  const { menuId } = searchParamsCache.all();
  if (!menuId) return null;

  const t = await getTranslations('menu');
  const { data: description, error } = await getMenuItemDescription(menuId);
  if (error)
    return <ErrorState message={t('messages.error.failedToLoadDescription')} />;

  return <P>{description || t('cards.description.placeholder')}</P>;
}

export default MenuItemDetailsDescription;
