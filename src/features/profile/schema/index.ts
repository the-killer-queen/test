import { z } from 'zod';

export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or less'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or less'),
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => {
        if (!phone || phone.trim() === '') return true;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
      },
      {
        message: 'Please enter a valid phone number',
      },
    ),
  avatar: z
    .any()
    .refine((file) => {
      if (!file) return true;
      return file?.size <= 5 * 1024 * 1024;
    }, 'Avatar size must be less than 5MB')
    .refine((file) => {
      if (!file) return true;
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
        file?.type,
      );
    }, 'Please upload a valid image file (JPEG, PNG, WebP)')
    .optional(),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'At least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
