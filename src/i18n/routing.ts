import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fa'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always',
});
