export const orderFilterOptions = [
  { value: 'paid', label: 'Paid', iconName: 'CreditCard' },
  { value: 'unpaid', label: 'Unpaid', iconName: 'Clock' },
  { value: 'togo', label: 'To Go', iconName: 'ShoppingBag' },
  { value: 'dinein', label: 'Dine In', iconName: 'MapPin' },
];
export const orderSortByOptions = [
  { value: 'created_at-desc', label: 'Newest first' },
  { value: 'created_at-asc', label: 'Oldest first' },
  { value: 'customer_name-asc', label: 'Customer (A - Z)' },
  { value: 'customer_name-desc', label: 'Customer (Z - A)' },
  { value: 'total_price-desc', label: 'Total (high - low)' },
  { value: 'total_price-asc', label: 'Total (low - high)' },
];
export const orderExcludedColumnsOptions = [
  { value: 'customer_contact', label: 'Contact' },
  { value: 'order_type', label: 'Type' },
  { value: 'items_count', label: 'Items' },
  { value: 'status', label: 'Status' },
];
