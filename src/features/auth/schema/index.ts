import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Enter a valid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'At least 8 characters'),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;

//SIGNUP
export const signupSchema = z
  .object({
    email: z.email('Enter a valid email').min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'At least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormSchema = z.infer<typeof signupSchema>;

//FORGOT-PASSWORD
export const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email').min(1, 'Email is required'),
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>;

//RESET-PASSWORD
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'At least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;
