'use client';

import DynamicIcon from '@/components/shared/DynamicIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { Link } from '@/i18n/navigation';
import { formatNumber } from '@/lib/utils';
import { MenuRow } from '@/types/tables';
import { Copy, Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import { useExcludedColumnsQuery } from '../../../../hooks/useExcludedColumnsQuery';
import DeleteMenuItemDialog from '../dialog/DeleteMenuItemDialog';
import DuplicateMenuItemDialog from '../dialog/DuplicateMenuItemDialog';
import UpdateMenuItemDialog from '../dialog/UpdateMenuItemDialog';

type MenuTableRowProps = {
  menuItem: MenuRow;
};

function MenuTableRow({ menuItem }: MenuTableRowProps) {
  const { excludedColumns } = useExcludedColumnsQuery();

  return (
    <TableRow>
      {/* AVATAR */}
      {!excludedColumns.includes('menu_item_picture') && (
        <TableCell className='px-2 md:px-4'>
          <Avatar>
            <AvatarImage
              src={menuItem.image_url ?? undefined}
              alt={`${menuItem.name} image`}
              className='object-cover'
            />
            <AvatarFallback>
              {menuItem.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </TableCell>
      )}

      {/* NAME */}
      <TableCell className='px-2 text-sm font-semibold md:px-4 md:text-base'>
        {menuItem.name}
      </TableCell>

      {/* CATEGORY */}
      {!excludedColumns.includes('category') && (
        <TableCell className='px-2 md:px-4'>
          <div className='flex items-center gap-0.5 text-xs capitalize md:gap-2 md:text-sm'>
            {menuItem.menu_categories?.icon_name && (
              <DynamicIcon
                iconName={menuItem?.menu_categories?.icon_name || ''}
                className='size-3 md:size-4'
              />
            )}

            {menuItem.category ? menuItem.category.replaceAll('_', ' ') : '—'}
          </div>
        </TableCell>
      )}

      {/* INGREDIENTS */}
      {!excludedColumns.includes('ingredients') && (
        <TableCell className='w-max overflow-hidden text-xs md:text-sm'>
          <div className='flex items-center gap-1'>
            {menuItem.ingredients?.length
              ? menuItem.ingredients.slice(0, 3).map((ing, i) => (
                  <Badge variant={'secondary'} key={i} className='text-xs'>
                    {ing.name}
                  </Badge>
                ))
              : '—'}
          </div>
        </TableCell>
      )}

      {/* PRICE */}
      <TableCell className='px-2 md:px-4'>
        <div className='flex items-center'>
          <span className='text-sm font-semibold md:text-base'>
            {formatNumber({
              locale: 'en-US',
              number: menuItem.price,
            })}
          </span>
        </div>
      </TableCell>

      {/* ACTIONS */}
      <TableCell className='px-2 text-end md:px-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-0 w-0'>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='mr-2 md:mr-4' side='bottom'>
            <DeleteMenuItemDialog
              menuItemId={menuItem.id}
              itemName={menuItem.name}
            >
              <DropdownMenuItem
                variant='destructive'
                className='hover:!bg-destructive/5 cursor-pointer'
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DeleteMenuItemDialog>
            <UpdateMenuItemDialog menuItem={menuItem}>
              <DropdownMenuItem className='!text-info [&_svg]:!text-info hover:!bg-info/5 cursor-pointer'>
                <SquarePen />
                Edit
              </DropdownMenuItem>
            </UpdateMenuItemDialog>

            <DuplicateMenuItemDialog
              menuItemId={menuItem.id}
              itemName={menuItem.name}
            >
              <DropdownMenuItem className='!text-warning [&_svg]:!text-warning hover:!bg-warning/5 cursor-pointer'>
                <Copy />
                Duplicate
              </DropdownMenuItem>
            </DuplicateMenuItemDialog>

            <DropdownMenuItem
              asChild
              variant='default'
              className='hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer'
            >
              <Link
                href={`/dashboard/menu/view/${menuItem.id}`}
                className='flex items-center gap-2'
              >
                <Eye />
                View
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default MenuTableRow;
