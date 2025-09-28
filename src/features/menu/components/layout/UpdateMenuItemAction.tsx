import { Button } from '@/components/ui/button';
import { searchParamsCache } from '@/lib/utils';
import { getMenuItemById } from '@/supabase/data/menu-service';
import { VariantProps } from 'class-variance-authority';
import { AlertTriangle, Edit } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import UpdateMenuItemDialog from '../dialog/UpdateMenuItemDialog';

type UpdateMenuItemActionProps = {
  className?: string;
  variant?: VariantProps<typeof Button>['variant'];
};

async function UpdateMenuItemAction({
  className,
  variant,
}: UpdateMenuItemActionProps) {
  const { menuId } = searchParamsCache.all();
  if (!menuId) return null;

  const t = await getTranslations('menu');
  const { data: menuItem, error } = await getMenuItemById(+menuId);
  if (!menuItem || error) {
    return (
      <Button variant={variant} size='sm' className={className} disabled>
        <AlertTriangle />
        <span>Error</span>
      </Button>
    );
  }

  return (
    <UpdateMenuItemDialog menuItem={menuItem}>
      <Button variant={variant} size='sm' className={className}>
        <Edit />
        <span>{t('cards.quickActions.editItem')}</span>
      </Button>
    </UpdateMenuItemDialog>
  );
}

export default UpdateMenuItemAction;
