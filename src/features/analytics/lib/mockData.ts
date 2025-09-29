import { OrderRow } from '@/types/tables';

export function generateMockAnalyticsData(period: string, customDate?: string | null) {
  // Generate mock monthly sales data
  const monthlySales = [
    { month: 'Jan', sales: 12500, orders: 85 },
    { month: 'Feb', sales: 15200, orders: 102 },
    { month: 'Mar', sales: 18900, orders: 128 },
    { month: 'Apr', sales: 16800, orders: 115 },
    { month: 'May', sales: 21300, orders: 145 },
    { month: 'Jun', sales: 19600, orders: 132 },
    { month: 'Jul', sales: 23400, orders: 158 },
    { month: 'Aug', sales: 25100, orders: 171 },
    { month: 'Sep', sales: 22800, orders: 156 },
    { month: 'Oct', sales: 26500, orders: 182 },
    { month: 'Nov', sales: 28200, orders: 195 },
    { month: 'Dec', sales: 31800, orders: 218 },
  ];

  // Generate mock top sales data
  const topSales = [
    { name: 'Margherita Pizza', value: 4500, fill: 'hsl(var(--chart-1))' },
    { name: 'Caesar Salad', value: 3200, fill: 'hsl(var(--chart-2))' },
    { name: 'Grilled Chicken', value: 2800, fill: 'hsl(var(--chart-3))' },
    { name: 'Pasta Carbonara', value: 2100, fill: 'hsl(var(--chart-4))' },
    { name: 'Chocolate Cake', value: 1600, fill: 'hsl(var(--chart-5))' },
  ];

  // Generate mock recent orders
  const recentOrders: OrderRow[] = [
    {
      id: 'ORD-001',
      order_name: 'lunch-special',
      customer_name: 'John Doe',
      customer_contact: '+1234567890',
      is_togo: true,
      status: 'paid',
      total_price: 45.50,
      notes: 'Extra sauce on the side',
      items: [
        { id: 1, name: 'Margherita Pizza', quantity: 1, price: 18.99 },
        { id: 2, name: 'Caesar Salad', quantity: 1, price: 12.99 },
        { id: 3, name: 'Coca Cola', quantity: 2, price: 2.99 },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      updated_at: new Date().toISOString(),
    },
    {
      id: 'ORD-002',
      order_name: null,
      customer_name: 'Jane Smith',
      customer_contact: 'jane@example.com',
      is_togo: false,
      status: 'unpaid',
      total_price: 32.75,
      notes: null,
      items: [
        { id: 4, name: 'Grilled Chicken', quantity: 1, price: 24.99 },
        { id: 5, name: 'Iced Tea', quantity: 2, price: 3.99 },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      updated_at: new Date().toISOString(),
    },
    {
      id: 'ORD-003',
      order_name: 'family-dinner',
      customer_name: null,
      customer_contact: null,
      is_togo: true,
      status: 'paid',
      total_price: 78.25,
      notes: 'Birthday celebration',
      items: [
        { id: 6, name: 'Pasta Carbonara', quantity: 2, price: 16.99 },
        { id: 7, name: 'Chocolate Cake', quantity: 1, price: 8.99 },
        { id: 8, name: 'Wine', quantity: 1, price: 35.99 },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      updated_at: new Date().toISOString(),
    },
    {
      id: 'ORD-004',
      order_name: 'quick-bite',
      customer_name: 'Mike Johnson',
      customer_contact: '+1987654321',
      is_togo: true,
      status: 'paid',
      total_price: 15.99,
      notes: null,
      items: [
        { id: 9, name: 'Burger', quantity: 1, price: 12.99 },
        { id: 10, name: 'Fries', quantity: 1, price: 4.99 },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
      updated_at: new Date().toISOString(),
    },
    {
      id: 'ORD-005',
      order_name: null,
      customer_name: 'Sarah Wilson',
      customer_contact: 'sarah@example.com',
      is_togo: false,
      status: 'unpaid',
      total_price: 28.50,
      notes: 'Table 5',
      items: [
        { id: 11, name: 'Fish & Chips', quantity: 1, price: 19.99 },
        { id: 12, name: 'Lemonade', quantity: 2, price: 4.25 },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      updated_at: new Date().toISOString(),
    },
  ];

  // Generate mock stats based on period
  const stats = {
    totalRevenue: period === '7d' ? 8500 : period === '30d' ? 32400 : period === '90d' ? 95200 : 285600,
    totalOrders: period === '7d' ? 58 : period === '30d' ? 218 : period === '90d' ? 642 : 1856,
    totalMenuItems: 24,
    averageOrderValue: period === '7d' ? 146.55 : period === '30d' ? 148.62 : period === '90d' ? 148.28 : 153.88,
    revenueChange: period === '7d' ? 12.5 : period === '30d' ? 8.2 : period === '90d' ? 15.8 : 22.4,
    ordersChange: period === '7d' ? 5.8 : period === '30d' ? 12.1 : period === '90d' ? 18.5 : 25.2,
    menuItemsChange: 4.2,
    avgOrderChange: period === '7d' ? 2.1 : period === '30d' ? -1.5 : period === '90d' ? 3.8 : 6.2,
  };

  return {
    monthlySales,
    topSales,
    recentOrders,
    stats,
  };
}