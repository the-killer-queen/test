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

export const tableHeaderColumns = [
  { value: 'order_id', label: 'Order ID', icon: 'ShoppingCart' },
  { value: 'customer_name', label: 'Customer', icon: 'User' },
  { value: 'customer_contact', label: 'Contact', icon: 'Phone' },
  { value: 'order_type', label: 'Type', icon: 'MapPin' },
  { value: 'items_count', label: 'Items', icon: 'ShoppingCart' },
  { value: 'status', label: 'Status', icon: 'CreditCard' },
  { value: 'total_price', label: 'Total', icon: 'DollarSign' },
  { value: 'created_at', label: 'Date', icon: 'Calendar' },
];
