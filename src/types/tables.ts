import { type MenuIngredient } from '@/features/menu';
import { type OrderItem } from '@/features/orders';
import {
  Database,
  Tables as DatabaseTables,
  TablesInsert,
  TablesUpdate,
  Enums,
} from './database';

// Re-export the utility types from database.ts for consistency
export type Tables<T extends keyof Database['public']['Tables']> =
  DatabaseTables<T>;
export type Inserts<T extends keyof Database['public']['Tables']> =
  TablesInsert<T>;
export type Updates<T extends keyof Database['public']['Tables']> =
  TablesUpdate<T>;

// Specific table types using the database utility types
export type OrderRow = Tables<'orders'>;
export type MenuRowRaw = Tables<'menu'>;
export type MenuCategoryRow = Tables<'menu_categories'>;
export type AdditionalChargesRow = Tables<'additional_charges'>;
export type OrderItemRow = Tables<'order_items'>;

// Order types
export type OrderInsert = Inserts<'orders'>;
export type OrderUpdate = Updates<'orders'>;
export type DeletedOrderRow = Tables<'orders'>;

// Menu Category types
export type MenuCategoryInsert = Inserts<'menu_categories'>;
export type MenuCategoryUpdate = Updates<'menu_categories'>;
export type DeletedMenuCategoryRow = Tables<'menu_categories'>;

// Additional Charges types
export type AdditionalChargesInsert = Inserts<'additional_charges'>;
export type AdditionalChargesUpdate = Updates<'additional_charges'>;

// Order Items types
export type OrderItemInsert = Inserts<'order_items'>;
export type OrderItemUpdate = Updates<'order_items'>;

// Typed table types (with proper JSONB types)
export type MenuRow = Omit<MenuRowRaw, 'ingredients'> & {
  ingredients: MenuIngredient[] | null;
  menu_categories?: MenuCategoryRow | null;
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

// Enum types using the database utility
export type OrderStatus = Enums<'order_status'>;
export type StreakGoalTypes = Enums<'streak_goal_types'>;

// View types
export type MenuWithTotalsRow =
  Database['public']['Views']['menu_with_totals']['Row'];

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

export type OrderCustomerInfoRow = {
  customer_name: string | null;
  customer_contact: string | null;
};

export type OrderDetailsRow = {
  customer_name: string | null;
  customer_contact: string | null;
  total_price: number;
  status: Database['public']['Enums']['order_status'];
  is_togo: boolean;
  created_at: string;
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
