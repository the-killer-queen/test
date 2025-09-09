import { z } from 'zod';

export const orderItemSchema = z.object({
  item_name: z.string(),
  quantity: z.number().int().min(1),
  price: z.number().nonnegative(),
  tag: z.string().optional(),
});

export const orderSchema = z.object({
  id: z.number().int(),
  order_name: z.string().optional(),
  customer_name: z.string().optional(),
  customer_contact: z.string().optional(),
  is_togo: z.boolean(),
  status: z.enum(['paid', 'unpaid']),
  total_price: z.number().nonnegative(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createOrderSchema = z.object({
  order_name: z.string().optional(),
  customer_name: z.string().optional(),
  customer_contact: z.string().optional(),
  is_togo: z.boolean(),
  status: z.enum(['paid', 'unpaid']),
  total_price: z.number().nonnegative(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema),
});
