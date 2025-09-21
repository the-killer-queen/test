export type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// Type definitions (add these to your types file)
export type OrderSortField = 'created_at' | 'customer_name' | 'total_price';
export type SortDirection = 'asc' | 'desc';
