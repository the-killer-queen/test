import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../lib/constant';

export const menuIngredientSchema = z.object({
  name: z
    .string({
      error: 'Ingredient name is required',
    })
    .min(1, {
      error: 'Ingredient name cannot be empty',
    })
    .max(16, {
      error: 'Ingredient name must be 64 characters or less',
    }),
  quantity: z.string().optional(),
});

export type MenuIngredientSchema = z.infer<typeof menuIngredientSchema>;

export const updateMenuItemSchema = z.object({
  name: z
    .string({
      error: 'Menu item name is required',
    })
    .min(1, {
      error: 'Menu item name cannot be empty',
    })
    .max(100, {
      error: 'Menu item name must be 100 characters or less',
    }),
  price: z
    .number({
      error: 'Price must be a valid number',
    })
    .min(0, {
      error: 'Price cannot be negative',
    })
    .max(10_000_000, {
      error: 'Price cannot exceed 10,000,000',
    }),
  image: z
    .any()
    .refine((file) => file?.size < MAX_FILE_SIZE, {
      error: `Image size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      error: `Please upload a valid image file (${ACCEPTED_IMAGE_TYPES.join(', ')})`,
    })
    .optional(),
  ingredients: z.array(menuIngredientSchema).optional(),
  category: z
    .object({
      name: z.string().nullable().optional(),
      icon_name: z.string().nullable().optional(),
    })
    .refine((field) => field.name !== undefined, {
      error: 'Please select a category',
    }),

  description: z
    .string()
    .max(280, {
      error: 'Description cannot exceed 280 characters',
    })
    .optional(),
});

export type UpdateMenuItemSchema = z.infer<typeof updateMenuItemSchema>;

export const createMenuItemSchema = z.object({
  name: z
    .string({
      error: 'Menu item name is required',
    })
    .min(1, {
      error: 'Menu item name cannot be empty',
    })
    .max(16, {
      error: 'Menu item name must be 100 characters or less',
    }),
  price: z
    .number({
      error: 'Price must be a valid number',
    })
    .min(0.1, {
      error: 'Price must be at least 0.10',
    })
    .max(10_000_000, {
      error: 'Price cannot exceed 10,000,000',
    }),
  image: z
    .any()
    .refine((file) => file?.size < MAX_FILE_SIZE, {
      error: `Image size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      error: `Please upload a valid image file (${ACCEPTED_IMAGE_TYPES.join(', ')})`,
    })
    .optional(),
  ingredients: z.array(menuIngredientSchema).optional(),
  category: z
    .object({
      name: z.string().nullable().optional(),
      icon_name: z.string().nullable().optional(),
    })
    .refine((field) => field.name !== undefined, {
      error: 'Please select a category',
    }),

  description: z
    .string()
    .max(280, {
      error: 'Description cannot exceed 280 characters',
    })
    .optional(),
});

export type CreateMenuItemSchema = z.infer<typeof createMenuItemSchema>;

export const createCategorySchema = z.object({
  name: z
    .string({
      error: 'Category name is required',
    })
    .min(3, {
      error: 'Category name must be at least 3 characters',
    })
    .max(16, {
      error: 'Category name must be 64 characters or less',
    }),
  icon_name: z
    .string({
      error: 'Icon name must be valid text',
    })
    .min(3, {
      error: 'Icon name must be at least 3 characters',
    })
    .max(16, {
      error: 'Icon name must be 64 characters or less',
    })
    .nullable(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
