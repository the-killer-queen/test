'use client';

import DynamicIcon from '@/components/shared/DynamicIcon';
import { Small } from '@/components/typography/Small';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { cn, formatNumber } from '@/lib/utils';
import { MenuRow } from '@/types/tables';
import { Minus, Plus } from 'lucide-react';
import { useGetMenu } from '../../hooks/useGetMenu';
import MenuItemsSelectorError from '../error/MenuItemsSelectorError';
import MenuItemsSelectorSkeleton from '../skeletons/MenuItemsSelectorSkeleton';
import { parseAsString, useQueryState } from 'nuqs';
import { ControllerRenderProps } from 'react-hook-form';
import { OrderItem } from '../../lib/types';
import { Input } from '@/components/ui/input';

type OrderItemListProps = { field: ControllerRenderProps };

function OrderItemList({ field }: OrderItemListProps) {
  const [query] = useQueryState(
    'menu_item_query',
    parseAsString.withDefault(''),
  );
  const { filters } = useFiltersQuery('menu_item_filter');
  const { menu, isPending, error } = useGetMenu();

  if (error) return <MenuItemsSelectorError />;
  if (isPending || !menu) return <MenuItemsSelectorSkeleton />;

  const filteredItems = menu.filter((item) => {
    if (filters.length === 0) return true;

    return filters.some(
      (filter) => item.category?.toLowerCase() === filter.toLowerCase(),
    );
  });

  const searchFilteredItems = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  function addItem(menuItem: MenuRow) {
    const newItem: OrderItem = {
      name: menuItem.name,
      quantity: 1,
      price: menuItem.price,
      id: menuItem.id,
    };
    field.onChange([...field.value, newItem]);
  }

  function updateQuantity(id: number, newQuantity: number) {
    if (newQuantity <= 0) {
      const updatedItems = field.value.filter(
        (item: OrderItem) => item.id !== id,
      );
      field.onChange(updatedItems);
    } else {
      const updatedItems = field.value.map((item: OrderItem) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      );
      field.onChange(updatedItems);
    }
  }

  return (
    <div className='h-max max-h-52 overflow-y-auto'>
      <div className='grid grid-cols-1 gap-1'>
        {searchFilteredItems.map((item) => {
          const selectedItem = field.value.find(
            (value: OrderItem) => value.id === item.id,
          );

          return (
            <div
              key={item.id}
              className={cn(
                'bg-card hover:bg-accent/50 flex items-center rounded-lg border px-2 py-1 transition-colors md:px-3 md:py-2',
                selectedItem && 'bg-primary/5 border-primary/20',
              )}
            >
              {/* Icon */}
              <div className='mr-1 md:mr-2'>
                <Avatar className='h-6 w-6 md:h-10 md:w-10'>
                  <AvatarFallback>
                    <DynamicIcon
                      iconName={item.menu_categories?.icon_name || ''}
                      className='text-muted-foreground size-3 md:size-5'
                    />
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Item details */}
              <div className='h-full flex-1'>
                <div className='flex h-full items-start justify-between'>
                  <div>
                    <Small>{item.name}</Small>
                    <div className='flex items-center gap-1 md:gap-2'>
                      {item.category && (
                        <Badge
                          variant='secondary'
                          className='px-1 py-0 text-xs md:px-2 md:py-1'
                        >
                          {item.category}
                        </Badge>
                      )}
                      <span className='text-primary text-xs font-bold md:text-sm'>
                        {formatNumber({
                          locale: 'en-US',
                          number: item.price,
                          options: {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 2,
                          },
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex h-full items-center justify-center'>
                    {selectedItem ? (
                      <div className='flex items-center gap-1 md:gap-2'>
                        {/* Quantity controls */}
                        <div className='flex items-center rounded-lg border'>
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='h-6 w-6 rounded-r-none border-r md:h-8 md:w-8'
                            onClick={() => {
                              if (selectedItem.quantity >= 0)
                                updateQuantity(
                                  item.id,
                                  selectedItem.quantity - 1,
                                );
                            }}
                          >
                            <Minus className='h-3 w-3 md:h-4 md:w-4' />
                          </Button>

                          <Input
                            step={1}
                            min={1}
                            max={100}
                            maxLength={3}
                            inputMode='numeric'
                            type='text'
                            value={selectedItem.quantity}
                            onChange={(e) => {
                              const value = e.currentTarget.value;
                              const numValue = +value;

                              if (value.length <= 3 && numValue <= 100)
                                updateQuantity(item.id, numValue);
                            }}
                            className='!bg-background m-0 h-6 !w-8 text-center text-xs font-medium md:h-8 md:!w-14 md:text-sm'
                          />

                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='h-6 w-6 rounded-l-none border-l md:h-8 md:w-8'
                            onClick={() => {
                              if (selectedItem.quantity <= 100)
                                updateQuantity(
                                  item.id,
                                  selectedItem.quantity + 1,
                                );
                            }}
                          >
                            <Plus className='h-3 w-3 md:h-4 md:w-4' />
                          </Button>
                        </div>

                        <div className='text-right text-xs font-bold md:text-sm'>
                          {formatNumber({
                            locale: 'en-US',
                            number: item.price * selectedItem.quantity,
                            options: {
                              style: 'currency',
                              currency: 'USD',
                              maximumFractionDigits: 2,
                            },
                          })}
                        </div>
                      </div>
                    ) : (
                      <Button
                        size={'sm'}
                        type='button'
                        onClick={() => addItem(item)}
                        className='h-6 px-2 text-xs md:h-8 md:px-3 md:text-sm [&_span]:hidden'
                      >
                        <Plus className='h-3 w-3 md:h-4 md:w-4' />
                        <span>Add to Order</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderItemList;
