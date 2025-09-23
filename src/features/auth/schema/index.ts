import z from 'zod';
import { FIELD_LIMITS, VALIDATION_MESSAGES } from '@/config/config';

export const loginSchema = z.object({
  email: z
    .email(VALIDATION_MESSAGES.VALIDATION.VALID_EMAIL)
    .min(FIELD_LIMITS.EMAIL_MIN, VALIDATION_MESSAGES.REQUIRED.EMAIL),
  password: z
    .string()
    .min(FIELD_LIMITS.EMAIL_MIN, VALIDATION_MESSAGES.REQUIRED.PASSWORD)
    .min(FIELD_LIMITS.PASSWORD_MIN, VALIDATION_MESSAGES.LENGTH.PASSWORD_MIN),
});

//SIGNUP
export const signupSchema = z
  .object({
    email: z
      .email(VALIDATION_MESSAGES.VALIDATION.VALID_EMAIL)
      .min(FIELD_LIMITS.EMAIL_MIN, VALIDATION_MESSAGES.REQUIRED.EMAIL),
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
  .refine((data) => data.password === data.confirmPassword, {
    error: VALIDATION_MESSAGES.VALIDATION.PASSWORDS_MATCH,
    path: ['confirmPassword'],
  });

//FORGOT-PASSWORD
export const forgotPasswordSchema = z.object({
  email: z
    .email(VALIDATION_MESSAGES.VALIDATION.VALID_EMAIL)
    .min(FIELD_LIMITS.EMAIL_MIN, VALIDATION_MESSAGES.REQUIRED.EMAIL),
});

//RESET-PASSWORD
export const resetPasswordSchema = z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.VALIDATION.PASSWORDS_MATCH,
    path: ['confirmPassword'],
  });

export type ActionResult = {
  success: boolean;
  error?: string;
};

export type LoginFormSchema = z.infer<typeof loginSchema>;
export type SignupFormSchema = z.infer<typeof signupSchema>;
export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;
