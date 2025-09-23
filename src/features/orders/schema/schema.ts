import { z } from 'zod';
import { ORDER_STATUS, VALIDATION_MESSAGES } from '@/config/config';

export const orderItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1, VALIDATION_MESSAGES.REQUIRED.ITEM_NAME),
  quantity: z
    .number()
    .int()
    .min(1, VALIDATION_MESSAGES.VALIDATION.MIN_QUANTITY),
  price: z.number().nonnegative(VALIDATION_MESSAGES.PRICE.NON_NEGATIVE),
});

export const createOrderSchema = z.object({
  order_name: z.string().optional(),
  customer_name: z.string().optional(),
  customer_contact: z.string().optional(),
  is_togo: z.boolean(),
  status: z.enum(ORDER_STATUS),
  total_price: z.number().nonnegative(VALIDATION_MESSAGES.PRICE.NON_NEGATIVE),
  notes: z.string().optional(),
  items: z
    .array(orderItemSchema)
    .min(1, VALIDATION_MESSAGES.VALIDATION.MIN_ITEMS),
});

export const updateOrderSchema = z.object({
  order_name: z.string().optional(),
  customer_name: z.string().optional(),
  customer_contact: z.string().optional(),
  is_togo: z.boolean(),
  status: z.enum(ORDER_STATUS),
  total_price: z.number().nonnegative(VALIDATION_MESSAGES.PRICE.NON_NEGATIVE),
  notes: z.string().optional(),
  items: z
    .array(orderItemSchema)
    .min(1, VALIDATION_MESSAGES.VALIDATION.MIN_ITEMS),
});

export type OrderItemSchema = z.infer<typeof orderItemSchema>;
export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;
