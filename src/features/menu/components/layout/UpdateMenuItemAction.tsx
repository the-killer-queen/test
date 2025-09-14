import { Button } from '@/components/ui/button';
import { getMenuItemById } from '@/supabase/data/menu-service';
import { VariantProps } from 'class-variance-authority';
import { Edit } from 'lucide-react';
import UpdateMenuItemDialog from '../dialog/UpdateMenuItemDialog';

type UpdateMenuItemActionProps = {
  menuId: string;
  className?: string;
  variant?: VariantProps<typeof Button>['variant'];
};

async function UpdateMenuItemAction({
  className,
  variant,
  menuId,
}: UpdateMenuItemActionProps) {
  const { data: menuItem, error } = await getMenuItemById(+menuId);
  if (!menuItem || error) return <p>!!!!</p>;

  return (
    <UpdateMenuItemDialog menuItem={menuItem}>
      <Button variant={variant} size='sm' className={className}>
        <Edit />
        <span>Edit Item</span>
      </Button>
    </UpdateMenuItemDialog>
  );
}

export default UpdateMenuItemAction;
