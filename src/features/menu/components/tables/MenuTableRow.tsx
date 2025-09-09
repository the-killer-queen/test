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
import { formatNumber } from '@/lib/utils';
import { MenuRow } from '@/types/tables';
import { Copy, Ellipsis, Eye, SquarePen, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import UpdateMenuItemDialog from '../Dialog/UpdateMenuItemDialog';
import DeleteMenuItemDialog from '../Dialog/DeleteMenuItemDialog';
import DuplicateMenuItemDialog from '../Dialog/DuplicateMenuItemDialog';

type MenuTableRowProps = {
  menuItem: MenuRow;
};

function MenuTableRow({ menuItem }: MenuTableRowProps) {
  const searchParams = useSearchParams();
  const excludedColumns = searchParams.get('excluded_columns')
    ? searchParams.get('excluded_columns')!.split('%')
    : [];

  return (
    <TableRow>
      {/* AVATAR */}
      {!excludedColumns.includes('menu_item_picture') && (
        <TableCell>
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
      <TableCell className='font-semibold'>{menuItem.name}</TableCell>

      {/* CATEGORY */}
      {!excludedColumns.includes('category') && (
        <TableCell>
          <div className='flex items-center gap-1 capitalize'>
            {menuItem.menu_categories?.icon_name && (
              <DynamicIcon
                iconName={menuItem?.menu_categories?.icon_name || ''}
                className='size-3.5 lg:size-4'
              />
            )}

            {menuItem.category ? menuItem.category.replaceAll('_', ' ') : '—'}
          </div>
        </TableCell>
      )}

      {/* INGREDIENTS */}
      {!excludedColumns.includes('ingredients') && (
        <TableCell className='w-max overflow-hidden text-xs lg:text-base'>
          {menuItem.ingredients?.length
            ? menuItem.ingredients.slice(0, 3).map((ing, i) => (
                <Badge variant={'secondary'} key={i}>
                  {ing.name}
                </Badge>
              ))
            : '—'}
        </TableCell>
      )}

      {/* PRICE */}
      <TableCell>
        <div className='flex items-center'>
          <span>
            {formatNumber({
              locale: 'en-US',
              number: menuItem.price,
            })}
          </span>
        </div>
      </TableCell>

      {/* ACTIONS */}
      <TableCell className='text-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-0 w-0'>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='mr-4' side='bottom'>
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
