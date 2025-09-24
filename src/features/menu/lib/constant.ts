import { useTranslations } from 'next-intl';

// Hooks for translated options
export function useMenuSortByOptions() {
  const t = useTranslations('menu');
  return [
    { value: 'created_at-desc', label: t('sort.newestFirst') },
    { value: 'created_at-asc', label: t('sort.oldestFirst') },
    { value: 'name-asc', label: t('sort.nameAZ') },
    { value: 'name-desc', label: t('sort.nameZA') },
    { value: 'price-desc', label: t('sort.priceHighLow') },
    { value: 'price-asc', label: t('sort.priceLowHigh') },
  ];
}

export function useMenuExcludedColumnsOptions() {
  const t = useTranslations('menu');
  return [
    { value: 'menu_item_picture', label: t('table.headers.picture') },
    { value: 'category', label: t('table.headers.category') },
    { value: 'ingredients', label: t('table.headers.ingredients') },
  ];
}

export function useMenuTableHeaderColumns() {
  const t = useTranslations('menu');
  return [
    { value: 'menu_item_picture', label: '' },
    { value: 'name', label: t('table.headers.name'), icon: 'Tag' },
    { value: 'category', label: t('table.headers.category'), icon: 'ListTree' },
    {
      value: 'ingredients',
      label: t('table.headers.ingredients'),
      icon: 'Utensils',
    },
    { value: 'price', label: t('table.headers.price'), icon: 'DollarSign' },
  ];
}

// Keep original exports for backward compatibility
export const icons = [
  'Apple',
  'Banana',
  'Cherry',
  'Grape',
  'Citrus',

  'Bean',
  'Carrot',
  'Wheat',
  'Hop',

  'Beef',
  'Fish',
  'EggFried',
  'Egg',

  'Cake',
  'CakeSlice',
  'Cookie',
  'Croissant',
  'Donut',
  'Pretzel',

  'IceCreamBowl',
  'IceCreamCone',
  'Popsicle',

  'Hamburger',
  'Pizza',
  'Salad',
  'Soup',
  'Sandwich',

  'Coffee',

  'Beer',
  'Martini',
  'Wine',
  'BottleWine',

  'CupSoda',
  'GlassWater',
  'Milk',

  'Candy',
  'Nut',
  'Popcorn',

  'Barrel',

  'Utensils',
  'UtensilsCrossed',
  'ForkKnife',
  'HandPlatter',
  'ChefHat',

  'Dessert',
];

export const tableHeaderColumns = [
  { value: 'menu_item_picture', label: '' },
  { value: 'name', label: 'Name', icon: 'Tag' },
  { value: 'category', label: 'Category', icon: 'ListTree' },
  { value: 'ingredients', label: 'Ingredients', icon: 'Utensils' },
  { value: 'price', label: 'Price', icon: 'DollarSign' },
];

export const menuSortByOptions = [
  { value: 'created_at-desc', label: 'Newest first' },
  { value: 'created_at-asc', label: 'Oldest first' },
  { value: 'name-asc', label: 'Name (A - Z)' },
  { value: 'name-desc', label: 'Name (Z - A)' },
  { value: 'price-desc', label: 'Price (high - low)' },
  { value: 'price-asc', label: 'Price (low - high)' },
];

export const menuExcludedColumnsOptions = [
  { value: 'menu_item_picture', label: 'Picture' },
  { value: 'category', label: 'Category' },
  { value: 'ingredients', label: 'Ingredients' },
];
