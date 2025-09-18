import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Item name is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  price: z.number().nonnegative('Price must be non-negative'),
});

export const createOrderSchema = z.object({
  order_name: z.string().optional(),
  customer_name: z.string().optional(),
  customer_contact: z.string().optional(),
  is_togo: z.boolean(),
  status: z.enum(['paid', 'unpaid']),
  total_price: z.number().nonnegative('Total price must be non-negative'),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
});

export const updateOrderSchema = z.object({
  order_name: z.string().optional(),
  customer_name: z.string().optional(),
  customer_contact: z.string().optional(),
  is_togo: z.boolean(),
  status: z.enum(['paid', 'unpaid']),
  total_price: z.number().nonnegative('Total price must be non-negative'),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
});

export type OrderItemSchema = z.infer<typeof orderItemSchema>;
export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;
