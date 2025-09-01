import { z } from 'zod';

export const menuIngredientSchema = z.object({
  name: z.string(),
  quantity: z.string().optional(),
});

export const updateMenuItemSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  price: z
    .number()
    .min(0, 'Price must be positive')
    .max(999.99, 'Price must be less than $1000'),
  image_url: z.url('Must be a valid URL').optional().or(z.literal('')),
  ingredients: z.array(menuIngredientSchema).optional(),
  tag: z.object({
    name: z.string(),
    icon: z.string().optional(),
  }),
});

export type UpdateMenuItemSchema = z.infer<typeof updateMenuItemSchema>;
