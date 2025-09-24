import { useTranslations } from 'next-intl';

// Note: These will be used in client components, so we need to create a hook
export function useOrderFilterOptions() {
  const t = useTranslations('orders');
  return [
    { value: 'paid', label: t('filters.paid'), iconName: 'CreditCard' },
    { value: 'unpaid', label: t('filters.unpaid'), iconName: 'Clock' },
    { value: 'togo', label: t('filters.togo'), iconName: 'ShoppingBag' },
    { value: 'dinein', label: t('filters.dinein'), iconName: 'MapPin' },
  ];
}

export function useOrderSortByOptions() {
  const t = useTranslations('orders');
  return [
    { value: 'created_at-desc', label: t('sort.newestFirst') },
    { value: 'created_at-asc', label: t('sort.oldestFirst') },
    { value: 'customer_name-asc', label: t('sort.customerAZ') },
    { value: 'customer_name-desc', label: t('sort.customerZA') },
    { value: 'total_price-desc', label: t('sort.totalHighLow') },
    { value: 'total_price-asc', label: t('sort.totalLowHigh') },
  ];
}

export function useOrderExcludedColumnsOptions() {
  const t = useTranslations('orders');
  return [
    { value: 'customer_contact', label: t('table.headers.contact') },
    { value: 'order_type', label: t('table.headers.type') },
    { value: 'items_count', label: t('table.headers.items') },
    { value: 'status', label: t('table.headers.status') },
  ];
}

export function useOrderTableHeaderColumns() {
  const t = useTranslations('orders');
  return [
    {
      value: 'order_id',
      label: t('table.headers.orderId'),
      icon: 'ShoppingCart',
    },
    {
      value: 'customer_name',
      label: t('table.headers.customer'),
      icon: 'User',
    },
    {
      value: 'customer_contact',
      label: t('table.headers.contact'),
      icon: 'Phone',
    },
    { value: 'order_type', label: t('table.headers.type'), icon: 'MapPin' },
    {
      value: 'items_count',
      label: t('table.headers.items'),
      icon: 'ShoppingCart',
    },
    { value: 'status', label: t('table.headers.status'), icon: 'CreditCard' },
    {
      value: 'total_price',
      label: t('table.headers.total'),
      icon: 'DollarSign',
    },
    { value: 'created_at', label: t('table.headers.date'), icon: 'Calendar' },
  ];
}

// Keep original exports for backward compatibility
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
