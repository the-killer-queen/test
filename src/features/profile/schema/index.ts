import { z } from 'zod';
import {
  FIELD_LIMITS,
  PHONE_REGEX,
  AVATAR_CONFIG,
  VALIDATION_MESSAGES,
} from '@/config/config';

export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(FIELD_LIMITS.FIRST_NAME_MIN, VALIDATION_MESSAGES.REQUIRED.FIRST_NAME)
    .max(
      FIELD_LIMITS.FIRST_NAME_MAX,
      'First name must be 50 characters or less',
    ),
  last_name: z
    .string()
    .min(FIELD_LIMITS.LAST_NAME_MIN, VALIDATION_MESSAGES.REQUIRED.LAST_NAME)
    .max(FIELD_LIMITS.LAST_NAME_MAX, 'Last name must be 50 characters or less'),
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => {
        if (!phone || phone.trim() === '') return true;
        return PHONE_REGEX.test(phone.replace(/\s/g, ''));
      },
      {
        message: VALIDATION_MESSAGES.VALIDATION.VALID_PHONE,
      },
    ),
  avatar: z
    .any()
    .refine((file) => {
      if (!file) return true;
      return file?.size <= AVATAR_CONFIG.MAX_SIZE;
    }, VALIDATION_MESSAGES.FILE.AVATAR_SIZE)
    .refine((file) => {
      if (!file) return true;
      return AVATAR_CONFIG.ACCEPTED_TYPES.includes(file?.type);
    }, VALIDATION_MESSAGES.FILE.VALID_AVATAR_TYPES)
    .optional(),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(FIELD_LIMITS.EMAIL_MIN, VALIDATION_MESSAGES.REQUIRED.PASSWORD)
      .min(FIELD_LIMITS.PASSWORD_MIN, VALIDATION_MESSAGES.LENGTH.PASSWORD_MIN),
    confirmPassword: z
      .string()
      .min(
        FIELD_LIMITS.EMAIL_MIN,
        VALIDATION_MESSAGES.REQUIRED.CONFIRM_PASSWORD,
      ),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: VALIDATION_MESSAGES.VALIDATION.PASSWORDS_MATCH,
    path: ['confirmPassword'],
  });

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
