import { type MenuIngredient } from '@/features/menu';
import { type OrderItem } from '@/features/orders';
import { Database } from './database';

// Utility type for table rows
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

// Utility type for inserts
export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

// Utility type for updates
export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Specific table types
export type OrderRow = Tables<'orders'>;
export type MenuRowRaw = Tables<'menu'>;
export type MenuCategoryRow = Tables<'menu_categories'>;

// Order types
export type OrderInsert = Inserts<'orders'>;
export type OrderUpdate = Updates<'orders'>;
export type DeletedOrderRow = Tables<'orders'>;

// Menu Category types
export type MenuCategoryInsert = Inserts<'menu_categories'>;
export type MenuCategoryUpdate = Updates<'menu_categories'>;
export type DeletedMenuCategoryRow = Tables<'menu_categories'>;

// Typed table types (with proper JSONB types)
export type MenuRow = Omit<MenuRowRaw, 'ingredients'> & {
  ingredients: MenuIngredient[] | null;
  menu_categories: MenuCategoryRow | null;
};

export type DeletedMenuRow = Omit<MenuRowRaw, 'ingredients'> & {
  ingredients: MenuIngredient[] | null;
};

export type MenuCategoryRowTyped = MenuCategoryRow;

// Typed insert types
export type MenuInsert = Omit<Inserts<'menu'>, 'ingredients'> & {
  ingredients?: MenuIngredient[] | null;
  image?: File;
};

// Typed update types
export type MenuUpdate = Omit<Updates<'menu'>, 'ingredients'> & {
  ingredients?: MenuIngredient[] | null;
  image?: File;
};

// Enum types
export type OrderStatus = Database['public']['Enums']['order_status'];
export type StreakGoalTypes = Database['public']['Enums']['streak_goal_types'];

// Utility types for specific use cases
export type MenuItemDetailsRow = {
  name: string;
  price: number;
  category: string | null;
  created_at: string;
} | null;

export type MenuItemImageRow = {
  name: string;
  image_url: string | null;
};

export type MenuItemIngredientsRow = MenuIngredient[] | null;

// Order-specific utility types
export type OrderItemsJson =
  Database['public']['Tables']['orders']['Row']['items'];

export type OrderWithTypedItems = Omit<OrderRow, 'items'> & {
  items: OrderItem[];
};

export type OrderInsertWithTypedItems = Omit<OrderInsert, 'items'> & {
  items: OrderItem[];
};

export type OrderUpdateWithTypedItems = Omit<OrderUpdate, 'items'> & {
  items?: OrderItem[];
};
