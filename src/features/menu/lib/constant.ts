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
