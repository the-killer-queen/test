import { z } from 'zod';

export const createAdditionalChargeSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  amount: z
    .number()
    .min(0.01, 'Amount must be greater than 0')
    .max(10_000_000, 'Amount must be less than 10,000,000'),
  description: z
    .string()
    .max(280, 'Description must be less than 280 characters')
    .optional()
    .or(z.literal('')),
  icon_name: z
    .string()
    .max(50, 'Icon name must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  is_active: z.boolean().default(true),
});

export type CreateAdditionalChargeSchema = z.input<
  typeof createAdditionalChargeSchema
>;
