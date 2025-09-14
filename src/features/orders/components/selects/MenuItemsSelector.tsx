'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useGetMenu } from '../../hooks/useGetMenu';
import { useGetMenuCategories } from '@/features/menu/hooks/useGetMenuCategories';
import DynamicIcon from '@/components/shared/DynamicIcon';

type OrderItem = {
  item_name: string;
  quantity: number;
  price: number;
  tag?: string;
};

function MenuItemsSelector(field: ControllerRenderProps) {
  const { menu, isPending, error } = useGetMenu();
  const {
    categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = useGetMenuCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (error) return <p>Error!!!!</p>;
  if (categoriesError) return <p>Errror!!!</p>;

  if (isPending || !menu) return <p>LOADING SKELETON!!!!</p>;
  if (categoriesPending || !categories) return <p>LOADING SKELETON!!!!</p>;

  const filteredItems = menu.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addItem = (menuItem: (typeof menu)[0]) => {
    const existingItems = field.value || [];
    const existingItem = existingItems.find(
      (item: OrderItem) => item.item_name === menuItem.name,
    );

    if (existingItem) {
      const updatedItems = existingItems.map((item: OrderItem) =>
        item.item_name === menuItem.name
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      field.onChange(updatedItems);
    } else {
      const newItem: OrderItem = {
        item_name: menuItem.name,
        quantity: 1,
        price: menuItem.price,
        tag: menuItem.category,
      };
      field.onChange([...existingItems, newItem]);
    }
  };

  const updateQuantity = (itemName: string, newQuantity: number) => {
    const existingItems = field.value || [];
    if (newQuantity <= 0) {
      const updatedItems = existingItems.filter(
        (item: OrderItem) => item.item_name !== itemName,
      );
      field.onChange(updatedItems);
    } else {
      const updatedItems = existingItems.map((item: OrderItem) =>
        item.item_name === itemName ? { ...item, quantity: newQuantity } : item,
      );
      field.onChange(updatedItems);
    }
  };

  const removeItem = (itemName: string) => {
    const existingItems = field.value || [];
    const updatedItems = existingItems.filter(
      (item: OrderItem) => item.item_name !== itemName,
    );
    field.onChange(updatedItems);
  };

  const getTotalPrice = () => {
    const items = field.value || [];
    return items.reduce(
      (total: number, item: OrderItem) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <div className='space-y-4'>
      {/* Search and Category Filter */}
      <div className='space-y-2'>
        <Input
          placeholder='Search menu items...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={
                selectedCategory === category.name ? 'default' : 'outline'
              }
              size='sm'
              onClick={() => setSelectedCategory(category.name)}
            >
              <DynamicIcon iconName={category.icon_name || ''} />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <Card>
        <CardContent className='p-4'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
            {filteredItems.map((item) => {
              const orderItem = (field.value || []).find(
                (orderItem: OrderItem) => orderItem.item_name === item.name,
              );
              const quantity = orderItem?.quantity || 0;

              return (
                <div
                  key={item.id}
                  className='flex items-center justify-between rounded-md border p-2'
                >
                  <div className='flex-1'>
                    <p className='font-medium'>{item.name}</p>
                    <p className='text-muted-foreground text-sm'>
                      {formatNumber({ locale: 'en-US', number: item.price })}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    {quantity > 0 ? (
                      <>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() =>
                            updateQuantity(item.name, quantity - 1)
                          }
                        >
                          <Minus className='h-3 w-3' />
                        </Button>
                        <span className='w-8 text-center'>{quantity}</span>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() =>
                            updateQuantity(item.name, quantity + 1)
                          }
                        >
                          <Plus className='h-3 w-3' />
                        </Button>
                      </>
                    ) : (
                      <Button size='icon' onClick={() => addItem(item)}>
                        <Plus className='h-3 w-3' />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Items */}
      {field.value && field.value.length > 0 && (
        <Card>
          <CardContent className='p-4'>
            <h4 className='mb-3 font-medium'>Selected Items</h4>
            <div className='space-y-2'>
              {field.value.map((item: OrderItem, index: number) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='secondary'>{item.quantity}x</Badge>
                    <span>{item.item_name}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>
                      {formatNumber({
                        locale: 'en-US',
                        number: item.price * item.quantity,
                      })}
                    </span>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => removeItem(item.item_name)}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              ))}
              <Separator />
              <div className='flex items-center justify-between font-semibold'>
                <span>Total</span>
                <span>
                  {formatNumber({
                    locale: 'en-US',
                    number: getTotalPrice(),
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default MenuItemsSelector;
