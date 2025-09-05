'use client';

import DynamicIcon from '@/components/shared/DynamicIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Ellipsis, Eye } from 'lucide-react';
import DeleteMenuItem from '../Dialog/DeleteMenuItemDialog';
import UpdateMenuItem from '../Dialog/UpdateMenuItemDialog';

type MenuTableRowProps = {
  menuItem: MenuRow;
};

function MenuTableRow({ menuItem }: MenuTableRowProps) {
  return (
    <TableRow>
      {/* AVATAR */}
      <TableCell>
        <Avatar>
          <AvatarImage
            src={menuItem.image_url ?? undefined}
            alt={`${menuItem.name} image`}
          />
          <AvatarFallback>
            {menuItem.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </TableCell>

      {/* NAME */}
      <TableCell className='font-semibold'>{menuItem.name}</TableCell>

      {/* CATEGORY */}
      <TableCell>
        <div className='flex items-center gap-1 capitalize'>
          <DynamicIcon
            iconName={menuItem?.menu_categories?.icon_name || ''}
            className='size-3.5 lg:size-4'
          />
          {menuItem.category ? menuItem.category.replaceAll('_', ' ') : '—'}
        </div>
      </TableCell>

      {/* INGREDIENTS */}
      <TableCell className='max-w-48 overflow-hidden text-xs lg:text-base'>
        {menuItem.ingredients?.length
          ? menuItem.ingredients
              .slice(0, 2)
              .map((ing) => ing.name)
              .join(', ')
          : '—'}
      </TableCell>

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
            <DeleteMenuItem menuItemId={menuItem.id} />

            <UpdateMenuItem menuItem={menuItem} />

            <DropdownMenuItem variant='default'>
              <Eye />
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default MenuTableRow;
