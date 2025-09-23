import { z } from 'zod';
import {
  FIELD_LIMITS,
  PRICE_LIMITS,
  VALIDATION_MESSAGES,
} from '@/config/config';

export const createAdditionalChargeSchema = z.object({
  name: z
    .string()
    .min(FIELD_LIMITS.ADDITIONAL_CHARGE_NAME_MIN, 'Name is required')
    .max(
      FIELD_LIMITS.ADDITIONAL_CHARGE_NAME_MAX,
      'Name must be less than 100 characters',
    ),
  amount: z
    .number()
    .min(PRICE_LIMITS.AMOUNT_MIN, VALIDATION_MESSAGES.PRICE.AMOUNT_MIN)
    .max(PRICE_LIMITS.MAX, VALIDATION_MESSAGES.PRICE.AMOUNT_MAX),
  description: z
    .string()
    .max(
      FIELD_LIMITS.DESCRIPTION_MAX,
      'Description must be less than 280 characters',
    )
    .optional()
    .or(z.literal('')),
  icon_name: z
    .string()
    .max(
      FIELD_LIMITS.ADDITIONAL_CHARGE_ICON_NAME_MAX,
      'Icon name must be less than 50 characters',
    )
    .optional()
    .or(z.literal('')),
  is_active: z.boolean().default(true),
});

export type CreateAdditionalChargeSchema = z.input<
  typeof createAdditionalChargeSchema
>;
