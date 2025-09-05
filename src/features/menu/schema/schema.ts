import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES } from '../lib/constant';

export const menuIngredientSchema = z.object({
  name: z.string(),
  quantity: z.string().optional(),
});

export const updateMenuItemSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().min(0).max(10_000_000),
  image_url: z.file().optional().or(z.literal('')),
  ingredients: z.array(menuIngredientSchema).optional(),
  category: z.string(),
});

export type UpdateMenuItemSchema = z.infer<typeof updateMenuItemSchema>;

export const createMenuItemSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().min(0.1).max(10_000_000),
  image: z
    .any()
    // .refine((file) => file?.at(0)?.size <= MAX_FILE_SIZE, 'Max SIZE')
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, 'Accepted')
    .optional(),
  ingredients: z.array(menuIngredientSchema).optional(),
  category: z.object({
    name: z.string(),
    icon_name: z.string().nullable(),
  }),
});

export type CreateMenuItemSchema = z.infer<typeof createMenuItemSchema>;

export const createCategorySchema = z.object({
  name: z.string().min(3).max(64),
  icon_name: z.string().min(3).max(64).nullable(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
