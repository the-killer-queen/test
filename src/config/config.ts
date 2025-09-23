export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const FIELD_LIMITS = {
  MENU_ITEM_NAME_MIN: 1,
  MENU_ITEM_NAME_MAX: 100,
  MENU_INGREDIENT_NAME_MIN: 1,
  MENU_INGREDIENT_NAME_MAX: 16,

  CATEGORY_NAME_MIN: 3,
  CATEGORY_NAME_MAX: 16,
  CATEGORY_ICON_NAME_MIN: 3,
  CATEGORY_ICON_NAME_MAX: 16,

  ADDITIONAL_CHARGE_NAME_MIN: 1,
  ADDITIONAL_CHARGE_NAME_MAX: 100,
  ADDITIONAL_CHARGE_ICON_NAME_MAX: 50,

  FIRST_NAME_MIN: 1,
  FIRST_NAME_MAX: 50,
  LAST_NAME_MIN: 1,
  LAST_NAME_MAX: 50,

  DESCRIPTION_MAX: 280,
  EMAIL_MIN: 1,
  PASSWORD_MIN: 8,
} as const;

export const PRICE_LIMITS = {
  MIN: 0,
  MIN_CREATE: 0.1,
  MAX: 10_000_000,
  AMOUNT_MIN: 0.01,
} as const;

export const ORDER_STATUS = ['paid', 'unpaid'] as const;

export const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export const AVATAR_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024,
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: {
    MENU_ITEM_NAME: 'Menu item name is required',
    INGREDIENT_NAME: 'Ingredient name is required',
    CATEGORY_NAME: 'Category name is required',
    FIRST_NAME: 'First name is required',
    LAST_NAME: 'Last name is required',
    EMAIL: 'Email is required',
    PASSWORD: 'Password is required',
    CONFIRM_PASSWORD: 'Confirm your password',
    ITEM_NAME: 'Item name is required',
  },
  LENGTH: {
    EMPTY: 'cannot be empty',
    PASSWORD_MIN: 'At least 8 characters',
    DESCRIPTION_MAX: 'Description cannot exceed 280 characters',
    MENU_ITEM_NAME_MAX: 'Menu item name must be 100 characters or less',
  },
  VALIDATION: {
    VALID_EMAIL: 'Enter a valid email',
    VALID_PHONE: 'Please enter a valid phone number',
    PASSWORDS_MATCH: 'Passwords do not match',
    VALID_IMAGE: 'Please upload a valid image file',
    CATEGORY_SELECT: 'Please select a category',
    MIN_QUANTITY: 'Quantity must be at least 1',
    MIN_ITEMS: 'At least one item is required',
  },
  PRICE: {
    NEGATIVE: 'Price cannot be negative',
    NON_NEGATIVE: 'Price must be non-negative',
    MIN_CREATE: 'Price must be at least 0.10',
    MAX_EXCEEDED: 'Price cannot exceed 10,000,000',
    AMOUNT_MIN: 'Amount must be greater than 0',
    AMOUNT_MAX: 'Amount must be less than 10,000,000',
  },
  FILE: {
    IMAGE_SIZE: `Image size must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`,
    AVATAR_SIZE: 'Avatar size must be less than 5MB',
    VALID_IMAGE_TYPES: `Please upload a valid image file (${ACCEPTED_IMAGE_TYPES.join(', ')})`,
    VALID_AVATAR_TYPES: 'Please upload a valid image file (JPEG, PNG, WebP)',
  },
} as const;

export const RESULT_PER_PAGE = 10;

export type OrderStatus = (typeof ORDER_STATUS)[number];
export type AcceptedImageType = (typeof ACCEPTED_IMAGE_TYPES)[number];
