import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Settings, Trash2 } from 'lucide-react';
import DeleteMenuItemDialog from '../dialog/DeleteMenuItemDialog';
import DuplicateMenuItemDialog from '../dialog/DuplicateMenuItemDialog';
import UpdateMenuItemAction from '../layout/UpdateMenuItemAction';

async function MenuItemQuickActionsCard({ menuId }: { menuId: string }) {
  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <Settings className='h-4 w-4' />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <UpdateMenuItemAction
          menuId={menuId}
          variant={'ghost'}
          className='w-full justify-start'
        />

        <DuplicateMenuItemDialog menuItemId={+menuId}>
          <Button variant='ghost' size='sm' className='w-full justify-start'>
            <Copy />
            Duplicate Item
          </Button>
        </DuplicateMenuItemDialog>

        <DeleteMenuItemDialog menuItemId={+menuId} redirectBack={true}>
          <Button
            variant='destructive'
            size='sm'
            className='w-full justify-start'
          >
            <Trash2 />
            Delete Item
          </Button>
        </DeleteMenuItemDialog>
      </CardContent>
    </Card>
  );
}

export default MenuItemQuickActionsCard;
