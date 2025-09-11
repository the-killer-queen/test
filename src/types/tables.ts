import { MenuIngredient } from '@/features/menu/lib/types';
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

export type OrderInsert = Inserts<'orders'>;

export type MenuCategoryInsert = Inserts<'menu_categories'>;
export type MenuCategoryUpdate = Updates<'menu_categories'>;

// Typed table types (with proper JSONB types)
export type MenuRow = Omit<MenuRowRaw, 'ingredients'> & {
  ingredients: MenuIngredient[] | null;
  menu_categories: MenuCategoryRow | null;
};

export type DeletedMenuRow = Omit<MenuRowRaw, 'ingredients'> & {
  ingredients: MenuIngredient[] | null;
};

export type MenuCategoryRowTyped = MenuCategoryRow;
export type DeletedMenuCategoryRow = Tables<'menu_categories'>;

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
