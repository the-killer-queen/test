import { MenuIngredient, Tag } from '@/features/menu/schema/types';
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

export type OrderInsert = Inserts<'orders'>;

// Typed table types (with proper JSONB types)
export type MenuRow = Omit<MenuRowRaw, 'ingredients'> & {
  ingredients: MenuIngredient[] | null;
  tag: Tag | null;
};

// Typed insert types
export type MenuInsert = Omit<Inserts<'menu'>, 'ingredients'> & {
  ingredients?: MenuIngredient[] | null;
  tag: Tag | null;
};

// Typed update types
export type MenuUpdate = Omit<Updates<'menu'>, 'ingredients'> & {
  ingredients?: MenuIngredient[] | null;
  tag: Tag | null;
};

// Enum types
export type OrderStatus = Database['public']['Enums']['order_status'];
