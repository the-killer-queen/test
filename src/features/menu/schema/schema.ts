import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  FIELD_LIMITS,
  PRICE_LIMITS,
  VALIDATION_MESSAGES,
} from '@/config/config';
import { z } from 'zod';

export const menuIngredientSchema = z.object({
  name: z
    .string({
      error: VALIDATION_MESSAGES.REQUIRED.INGREDIENT_NAME,
    })
    .min(FIELD_LIMITS.MENU_INGREDIENT_NAME_MIN, {
      error: `Ingredient name ${VALIDATION_MESSAGES.LENGTH.EMPTY}`,
    })
    .max(FIELD_LIMITS.MENU_INGREDIENT_NAME_MAX, {
      error: 'Ingredient name must be 64 characters or less',
    }),
  quantity: z.string().optional(),
});

export type MenuIngredientSchema = z.infer<typeof menuIngredientSchema>;

export const updateMenuItemSchema = z.object({
  name: z
    .string({
      error: VALIDATION_MESSAGES.REQUIRED.MENU_ITEM_NAME,
    })
    .min(FIELD_LIMITS.MENU_ITEM_NAME_MIN, {
      error: `Menu item name ${VALIDATION_MESSAGES.LENGTH.EMPTY}`,
    })
    .max(FIELD_LIMITS.MENU_ITEM_NAME_MAX, {
      error: VALIDATION_MESSAGES.LENGTH.MENU_ITEM_NAME_MAX,
    }),
  price: z
    .number({
      error: 'Price must be a valid number',
    })
    .min(PRICE_LIMITS.MIN, {
      error: VALIDATION_MESSAGES.PRICE.NEGATIVE,
    })
    .max(PRICE_LIMITS.MAX, {
      error: VALIDATION_MESSAGES.PRICE.MAX_EXCEEDED,
    }),
  image: z
    .any()
    .refine((file) => file?.size < MAX_IMAGE_SIZE, {
      error: VALIDATION_MESSAGES.FILE.IMAGE_SIZE,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      error: VALIDATION_MESSAGES.FILE.VALID_IMAGE_TYPES,
    })
    .optional(),
  ingredients: z.array(menuIngredientSchema).optional(),
  category: z
    .object({
      name: z.string().nullable().optional(),
      icon_name: z.string().nullable().optional(),
    })
    .refine((field) => field.name !== undefined, {
      error: VALIDATION_MESSAGES.VALIDATION.CATEGORY_SELECT,
    }),

  description: z
    .string()
    .max(FIELD_LIMITS.DESCRIPTION_MAX, {
      error: VALIDATION_MESSAGES.LENGTH.DESCRIPTION_MAX,
    })
    .optional(),
});

export type UpdateMenuItemSchema = z.infer<typeof updateMenuItemSchema>;

export const createMenuItemSchema = z.object({
  name: z
    .string({
      error: VALIDATION_MESSAGES.REQUIRED.MENU_ITEM_NAME,
    })
    .min(FIELD_LIMITS.MENU_ITEM_NAME_MIN, {
      error: `Menu item name ${VALIDATION_MESSAGES.LENGTH.EMPTY}`,
    })
    .max(FIELD_LIMITS.MENU_ITEM_NAME_MAX, {
      error: VALIDATION_MESSAGES.LENGTH.MENU_ITEM_NAME_MAX,
    }),
  price: z
    .number({
      error: 'Price must be a valid number',
    })
    .min(PRICE_LIMITS.MIN_CREATE, {
      error: VALIDATION_MESSAGES.PRICE.MIN_CREATE,
    })
    .max(PRICE_LIMITS.MAX, {
      error: VALIDATION_MESSAGES.PRICE.MAX_EXCEEDED,
    }),
  image: z
    .any()
    .refine((file) => file?.size < MAX_IMAGE_SIZE, {
      error: VALIDATION_MESSAGES.FILE.IMAGE_SIZE,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      error: VALIDATION_MESSAGES.FILE.VALID_IMAGE_TYPES,
    })
    .optional(),
  ingredients: z.array(menuIngredientSchema).optional(),
  category: z
    .object({
      name: z.string().nullable().optional(),
      icon_name: z.string().nullable().optional(),
    })
    .refine((field) => field.name !== undefined, {
      error: VALIDATION_MESSAGES.VALIDATION.CATEGORY_SELECT,
    }),

  description: z
    .string()
    .max(FIELD_LIMITS.DESCRIPTION_MAX, {
      error: VALIDATION_MESSAGES.LENGTH.DESCRIPTION_MAX,
    })
    .optional(),
});

export type CreateMenuItemSchema = z.infer<typeof createMenuItemSchema>;

export const createCategorySchema = z.object({
  name: z
    .string({
      error: VALIDATION_MESSAGES.REQUIRED.CATEGORY_NAME,
    })
    .min(FIELD_LIMITS.CATEGORY_NAME_MIN, {
      error: 'Category name must be at least 3 characters',
    })
    .max(FIELD_LIMITS.CATEGORY_NAME_MAX, {
      error: 'Category name must be 64 characters or less',
    }),
  icon_name: z
    .string({
      error: 'Icon name must be valid text',
    })
    .min(FIELD_LIMITS.CATEGORY_ICON_NAME_MIN, {
      error: 'Icon name must be at least 3 characters',
    })
    .max(FIELD_LIMITS.CATEGORY_ICON_NAME_MAX, {
      error: 'Icon name must be 64 characters or less',
    })
    .nullable(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
